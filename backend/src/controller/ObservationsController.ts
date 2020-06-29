import { createAsyncRoute, validate } from "./utils";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Observation } from "../entity/Observation";
import { sendError } from "./ErrorController";
import { Event } from "../entity/Event";
import { Description, FrontendObstacle, Obstacle } from "../entity/Description";
import { Location } from "../entity/Location";


export class ObservationController {

    private OBSERVATION404 = 'Observation does not exist';
    private EVENT404 = 'Event does not exist';

    public getObservations = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Observation);
        const observations = await repository.find();
        return res.status(200).json(observations);
    });

    public getObservationById = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Observation);
        const observation = await repository.findOne(req.params.id);
        if (observation) return res.status(200).json(observation);
        return sendError(res, 404, this.OBSERVATION404);
    });

    public createObservation = createAsyncRoute(async (req: Request, res: Response) => {
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
            const event = await manager.findOne(Event, req.body.event, { relations: ["observations"] });
            if (!event) return sendError(res, 404, this.EVENT404);
            observation.event = event;
        }

        await manager.insert(Observation, observation);

        return res.status(201)
            .location(`api/v1/observations/${observation.id}`)
            .json(observation);
    });

    public updateObservation = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Observation);
        const observation = await repository.findOne(req.params.id);
        if (!observation) sendError(res, 404, this.OBSERVATION404);

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

    public deleteObservation = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Observation);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, this.OBSERVATION404);
    });

    public getObstacles = createAsyncRoute(async (req: Request, res: Response) => {
        const isFrontend = req.query.frontend;
        const obstacles = (isFrontend === 'true') ? FrontendObstacle : Obstacle;

        const enumList = new Array<String>();
        for (let key in obstacles) {
            enumList.push(obstacles[key])
        }

        return res.status(200).json(enumList);
    });
}
