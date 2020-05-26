import { Request, Response } from "express";
import { createAsyncRoute } from "./utils";
import { getRepository, getManager } from "typeorm";
import { Event } from "../entity/Event";
import { sendError } from "./ErrorController";
import { User } from "../entity/User";
import { Observation } from "../entity/Observation";


export class EventControler {

    private EVENT404 = 'Event does not exist';
    private NO_PARTICIPANT = 'No participants to this event';
    private NO_OBSERVATIONS = 'This event has no observations';

    public getEvents = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Event);
        const events = await repository.find({ relations: ["owner"] });
        return res.status(200).json(events);
    });

    public getEventById = createAsyncRoute(async (req: Request, res: Response) => {
        const eventRepository = getRepository(Event);
        const event = await eventRepository.findOne(req.params.id, { relations: ["owner"] });
        if (event) return res.status(200).json(event);
        return sendError(res, 404, this.EVENT404);
    });

    public createEvent = createAsyncRoute(async (req: Request, res: Response) => {
        const manager = getManager();

        const event = new Event();
        event.owner = req.body.userId;
        event.title = req.body.title;
        event.password = req.body.password;
        event.beginning = new Date(req.body.beginning);
        event.ending = new Date(req.body.ending);
        event.objective = req.body.objective;
        event.numberOfImages = req.body.numberOfImages;
        event.observations = new Array<Observation>();

        await manager.insert(Event, event);

        return res.status(201)
            .location(`api/v1/events/${event.id}`)
            .json(event);
    });

    public updateEvent = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Event);
        const event = await repository.findOne(req.params.id);
        if (!event) return sendError(res, 404, this.EVENT404);

        if (event.owner) event.owner = req.body.userId;
        if (event.title) event.title = req.body.title;
        if (event.password) event.password = req.body.password;
        if (event.beginning) event.beginning = req.body.beginning;
        if (event.ending) event.ending = req.body.ending;
        if (event.objective) event.objective = req.body.objective;
        if (event.numberOfImages) event.numberOfImages = req.body.numberOfImages;

        await repository.save(event);

        return res.status(200).json(event);
    });

    public deleteEvent = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Event);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, this.EVENT404);
    });

    public getParticipants = createAsyncRoute(async (req: Request, res: Response) => {
        const manager = getManager();
        const event = await manager.findOne(Event, req.params.id);
        const participantsRaw = await manager.find(User, {
            relations: ["events"],
            where: `'${event}' = ANY(events)`
        });

        const participants = participantsRaw.map(user => user.pseudonym);
        if (participants.length > 0) return res.status(200).json(participants);
        return sendError(res, 404, this.NO_PARTICIPANT);
    });

    public getObservations = createAsyncRoute(async (req: Request, res: Response) => {
        const repository = getRepository(Event);
        const e = await repository.findOne(req.params.id)
        if (!e) return sendError(res, 404, this.EVENT404);
        const event = await repository.findOne(req.params.id, { relations: ["observations"] });
        return res.status(200).json(event.observations);
    });
}