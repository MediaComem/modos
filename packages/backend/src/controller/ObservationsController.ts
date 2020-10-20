import { createAsyncRoute, validate } from "./utils";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Observation } from "../entity/Observation";
import { sendError } from "./ErrorController";
import { Event } from "../entity/Event";
import { Description, FrontendObstacle, Obstacle } from "../entity/Description";
import { Location } from "../entity/Location";

const OBSERVATION404 = 'Observation does not exist';
const EVENT404 = 'Event does not exist';

export class ObservationController {
    public getObservations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const observations = await repository.find();
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
        if (!req.params.eventID)  {
            return res.status(404).send('No events found for this id');
        
        }

        const repEvents = getRepository(Event);
        const event = await repEvents.findOne(req.params.eventID, {
            relations: ['participants']
        });
        if (event.participants.length === 0)  {
            return res.status(404).send('No participant on this event');
        
        }

        const observations = [];
        const repObservations = getRepository(Observation);

        for (const participant in event.participants) {
            const observationFromParticipant = await repObservations.find({
                where: { owner: participant }
            });

            observations.push(observationFromParticipant);
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

            await validate(description);

            observation.description = description;
        }

        const bodyLoc = req.body.location;
        if (bodyLoc) {
            const location = observation.location;
            if (bodyLoc.latitude) location.latitude = bodyLoc.latitude;
            if (bodyLoc.longitude) location.longitude = bodyLoc.longitude;
            if (bodyLoc.altitude) location.altitude = bodyLoc.altitude;

            await validate(location);

            observation.location = location;
        }

        if (req.body.image) await observation.saveImage(req.body.imageData);

        await repository.save(observation);

        return res.status(200).json(observation);
    });

    public deleteObservation = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Observation);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, OBSERVATION404);
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
}
