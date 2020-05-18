import Observation from '../../models/observations';
import Event from '../../models/events';
import { sendError } from '../errors';
import { createAsyncRoute } from '../utils';
import { Request, Response } from 'express';


export class ObservationService {

    public getObservations(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observations = await Observation.find({});
            const observationsResponse = observations.map((observation: any) => observation.toObject());
            if (observations.length > 0) return res.status(200).json(observationsResponse);
            return sendError(res, 404, 'No observations found in the system');
        });
    }

    public getObservationById(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observation = await Observation.findById(req.params.id);
            if (observation) return res.status(200).json(observation.toObject());
            return sendError(res, 404, 'Observation does not exist');
        });
    }

    public createObservation(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observation = Observation();
            observation.owner = req.body.userId;
            observation.description = req.body.description;
            observation.location = req.body.location;
            await observation.saveImage(req.body.imageData);

            const newObservation = await Observation.create(observation);

            // If the request has an event field, add the observation to the referenced event.
            if (req.body.event) {
                const event = await Event.findById(req.body.event);
                if (!event) return sendError(res, 404, 'event does not exist');
                event.observations.push(newObservation._id);
                event.save();
            }

            return res.status(201)
                .location(`api/v1/observations/${newObservation._id}`)
                .json(newObservation.toObject());
        });
    }

    public updateObservation(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observationId = req.params.id;
            const updatedObservation = await Observation.findByIdAndUpdate(observationId, req.body, {
                new: true
            });
            if (updatedObservation) res.status(200).json(updatedObservation.toObject());
            return sendError(res, 404, 'Observation does not exist');
        });
    }

    public deleteObservation(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observation = await Observation.findByIdAndRemove(req.params.id);
            if (observation) return res.status(204).json({});
            return sendError(res, 404, 'Observation does not exist');
        });
    }

    public getObstacles(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const obstacles = await Observation.schema.obj.description.obj.obstacle.enum;
            if (obstacles) {
                let isFrontend = req.query.frontend;
                if (isFrontend) {
                    const obstaclesForFrontend = obstacles.slice(0, 7);
                    return res.status(200).json(obstaclesForFrontend);
                }
                return res.status(200).json(obstacles);
            }
            return sendError(res, 404, 'Obstacles does not exist');
        });
    }
};
