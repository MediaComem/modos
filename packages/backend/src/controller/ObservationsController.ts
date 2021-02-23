import { createAsyncRoute, validate } from './utils';
import { Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Observation } from '../entity/Observation';
import { sendError } from './ErrorController';
import { Event } from '../entity/Event';
import { User } from '../entity/User';
import { Description, FrontendObstacle, Obstacle } from '../entity/Description';
import { Helper } from "../entity/SofaProfile"
import { Location } from '../entity/Location';

const OBSERVATION404 = 'Observation does not exist';
const OBSERVATION_FILE_404 = 'Observation image not found';
const EVENT404 = 'Event does not exist';

export class ObservationController {
    public getObservations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        let observations = undefined;

        if (req.query.geojson === 'true') {
            const geojsonObservations = await repository.query(`
            SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(ST_AsGeoJSON(obs.*)::json)
                ) as observations 
            FROM (
                SELECT o.*, u.email, u.pseudonym
                FROM observation o
                INNER JOIN modos.user u on u.id=o."ownerId" 
                ) obs;
            `);
            observations = geojsonObservations[0];
        } else {
            observations = await repository.find({ relations: ['owner'] });
        }

        return res.status(200).json(observations);
    });

    public getObservationById = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const observation = await repository.findOne(req.params.id);
        if (observation) return res.status(200).json(observation);
        return sendError(res, 404, OBSERVATION404);
    });

    /**
     * Get all observations that are owned by an event trough an user
     */
    public getObservationByOwnerEvent = createAsyncRoute(async (req, res) => {
        const EVENT_ID = req.params.eventID;
        if (!EVENT_ID) {
            return res.status(404).send('No events found for this id');
        }

        const repEvents = getRepository(Event);
        const event = await repEvents.findOne(EVENT_ID, {
            relations: ['participants']
        });
        if (event.participants.length === 0) {
            return res.status(404).send('No participant on this event');
        }

        let observations = [];
        const repObservations = getRepository(Observation);

        if (req.query.geojson === 'true') {
            observations = await repObservations.query(
                `
            SELECT json_build_object(
                'type', 'FeatureCollection',
                'features', json_agg(ST_AsGeoJSON(obs.*)::json)
                ) as observations 
            FROM (
                SELECT o.*, u.email, u.pseudonym from observation o 
                INNER JOIN modos.user u ON u.id=o."ownerId"
                INNER JOIN user_events_event uee ON uee."userId"=u.id
                WHERE uee."eventId"=$1
                ) obs
            `,
                [EVENT_ID]
            );
        } else {
            observations = await repObservations
                .createQueryBuilder('observation')
                .innerJoinAndSelect('observation.owner', 'owner')
                .innerJoinAndSelect(
                    'user_events_event',
                    'uee',
                    'uee."userId"=owner.id'
                )
                .where('uee."eventId"=:eventID', { eventID: EVENT_ID })
                .getMany();
        }

        return res.status(200).send(observations);
    });

    public createObservation = createAsyncRoute(async (req, res) => {
        const manager = getManager();

        const description = new Description();
        description.freeText = req.body.description.freeText;
        description.obstacle = req.body.description.obstacle;
        description.impact = req.body.description.impact;

        await validate(description);

        const location = new Location();
        location.latitude = req.body.location.latitude;
        location.longitude = req.body.location.longitude;
        location.altitude = req.body.altitude;

        await validate(location);

        const observation = new Observation();
        observation.owner = req.body.userId;
        observation.description = description;
        observation.location = location;

        await validate(observation);

        await observation.saveImage(req.body.imageData);

        // If the request has an event field, add the observation to the referenced event.
        if (req.body.event) {
            const event = await manager.findOne(Event, req.body.event, {
                relations: ['observations']
            });
            if (!event) return sendError(res, 404, EVENT404);
            observation.event = event;
        }

        await manager.insert(Observation, observation);

        return res
            .status(201)
            .location(`api/v1/observations/${observation.id}`)
            .json(observation);
    });

    public updateObservation = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const observation = await repository.findOne(req.params.id);
        if (!observation) sendError(res, 404, OBSERVATION404);

        const bodyDescr = req.body.description;
        if (bodyDescr) {
            const description = observation.description;
            if (bodyDescr.freeText) description.freeText = bodyDescr.freeText;
            if (bodyDescr.obstacle) description.obstacle = bodyDescr.obstacle;
            if (bodyDescr.impact) description.impact = bodyDescr.impact;

            await validate(description, { skipMissingProperties: true });

            observation.description = description;
        }

        const bodyLoc = req.body.location;
        if (bodyLoc) {
            const location = observation.location;
            if (bodyLoc.latitude) location.latitude = bodyLoc.latitude;
            if (bodyLoc.longitude) location.longitude = bodyLoc.longitude;
            if (bodyLoc.altitude) location.altitude = bodyLoc.altitude;

            await validate(location, { skipMissingProperties: true });

            observation.location = location;
        }

        if (req.body.image) await observation.saveImage(req.body.imageData);

        await repository.save(observation);

        return res.status(200).json(observation);
    });

    public deleteObservation = createAsyncRoute(async (req, res) => {
        const OBSERVATION_ID = req.params.id;

        const repository = getRepository(Observation);

        try {
            const observation = await repository.findOneOrFail(OBSERVATION_ID);
            const result = await repository.delete(req.params.id);

            if (result.affected > 0) {
                try {
                    await observation.deleteImage();
                    return res.status(204).json({});
                } catch (err) {
                    return res
                        .status(206)
                        .json({ error: OBSERVATION_FILE_404 });
                }
            } else throw new Error(OBSERVATION404);
        } catch (err) {
            return sendError(res, 404, OBSERVATION404);
        }
    });

    public getObstacles = createAsyncRoute(async (req, res) => {
        const isFrontend = req.query.frontend;
        const obstacles = isFrontend === 'true' ? FrontendObstacle : Obstacle;

        const enumList = new Array<String>();
        for (let key in obstacles) {
            enumList.push(obstacles[key]);
        }

        return res.status(200).json(enumList);
    });

    
    public getEvaluations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const e = await repository.findOne(req.params.id)
        if (!e) return sendError(res, 404, EVENT404);
        const observation = await repository.findOne(req.params.id, { relations: ["evaluations"] });
        return res.status(200).json(observation.evaluations);
    });

    public getValidations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const e = await repository.findOne(req.params.id)
        if (!e) return sendError(res, 404, EVENT404);
        const observation = await repository.findOne(req.params.id, { relations: ["validations"] });
        return res.status(200).json(observation.validations);
    });

    public getLabelisations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const e = await repository.findOne(req.params.id)
        if (!e) return sendError(res, 404, EVENT404);
        const observation = await repository.findOne(req.params.id, { relations: ["labelisations"] });
        return res.status(200).json(observation.validations);
    });

    public getObstaclesToEvaluate = createAsyncRoute(async (req, res) => {
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(e.id) evaluation_nb")
            .leftJoin("observation_evaluation", "e", "e.observation=o.id")
            .where('(SELECT COUNT(e2.id) FROM "observation_evaluation" e2 WHERE e2."observationId"=o.id AND e2."ownerId"=' + req.body.userId + ' )=0')
            .groupBy("o.id")
            .orderBy("evaluation_nb")
            .limit(5)
            .getMany();
        return res.status(200).json(observations)
    });

    public getObstaclesToLabelise = createAsyncRoute(async (req, res) => {
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(l.id) labelisation_nb")
            .leftJoin("observation_labelisation", "l", "l.observation=o.id")
            .where('(SELECT COUNT(l2.id) FROM "observation_labelisation" l2 WHERE l2."observationId"=o.id AND l2."ownerId"=' + req.body.userId + ' )=0')
            .groupBy("o.id")
            .orderBy("labelisation_nb")
            .limit(10)
            .getMany();
        return res.status(200).json(observations)
    });

    public getObstaclesToValidate = createAsyncRoute(async (req, res) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        var helperWeight = ""
        switch (user.sofaProfile.helper) {
            case Helper.NO_HELPER:
                helperWeight = "weightNoHelper";
                break;
            case Helper.WALKER:
                helperWeight = "weightWalker";
                break;
            case Helper.WHITE_CANE:
                helperWeight = "weightWhiteCane";
                break;
            case Helper.WHEELCHAIR:
                helperWeight = "weightWheelchair";
                break;
            default:
                return res.status(200).json([])
        }
        user.sofaProfile.helper
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(e.id) evaluation_nb")
            .addSelect('AVG(NULLIF(e."'+helperWeight+'",-1)) "avgWeight"')
            .addSelect("COUNT(v.id) validation_nb")
            .leftJoin("observation_evaluation", "e", "e.observation=o.id")
            .leftJoin("observation_validation", "v", "v.observation=o.id")
            .where('(SELECT COUNT(v2.id) FROM "observation_validation" v2 WHERE v2."observationId"=o.id AND v2."ownerId"=' + req.body.userId + ' )=0')
            .having("COUNT(e.id) > 0")
            .andHaving('AVG(NULLIF(e."'+helperWeight+'",-1)) IS NOT NULL')
            .groupBy("o.id")
            .orderBy("validation_nb")
            .limit(10)
            .getRawMany();
        return res.status(200).json(observations)
    });
}
