import Event from '../../models/events';
import User from '../../models/users';
import { sendError } from '../errors';
import { createAsyncRoute } from '../utils';
import { Request, Response } from 'express';


export class EventService {

    public getEvents(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            let events = await Event.find({});
            if (events.length > 0) return res.status(200).json(events);
            return sendError(res, 404, 'No events found in the system');
        });
    }

    public getEventById(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const event = await Event.findById(req.params.id);
            if (event) return res.status(200).json(event);
            return sendError(res, 404, 'Event does not exist');
        });
    }

    public createEvent(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            req.body.owner = req.body.userId;
            const newEvent = await Event.create(req.body);
            return res.status(201)
                .location(`api/v1/events/${newEvent._id}`)
                .json(newEvent);
        });
    }

    public updateEvent(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const eventId = req.params.id;
            const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
                new: true,
                runValidators: true
            });
            if (updatedEvent) res.status(200).json(updatedEvent);
            return sendError(res, 404, 'Event does not exist');
        });
    }

    public deleteEvent(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const event = await Event.findByIdAndRemove(req.params.id);
            if (event) return res.status(204).json({});
            return sendError(res, 404, 'Event does not exist');
        });
    }

    public getParticipants(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const participantsRaw = await User.find({ events: req.params.id }, 'pseudonym');
            const participants = participantsRaw.map((user: any) => user.pseudonym);
            if (participants.length > 0) return res.status(200).json(participants);
            return sendError(res, 404, 'No participants to this event');
        });
    }

    public getObservations(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const observations = await Event.findById(req.params.id, 'observations');
            if (observations.length > 0) return res.status(200).json(observations);
            return sendError(res, 404, 'This event has no observations');
        });
    }
};