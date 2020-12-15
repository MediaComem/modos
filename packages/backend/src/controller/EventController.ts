import { Request, Response } from "express";
import { createAsyncRoute, validate } from "./utils";
import { getRepository, getManager, In } from "typeorm";
import { Event } from "../entity/Event";
import { sendError } from './ErrorController';
import { User } from "../entity/User";

const EVENT404 = 'Event does not exist';
const NO_PARTICIPANT = 'No participants to this event';
const NO_PARTICIPANT_DEFINED = 'No participants defined in your query';
const EVENT_PARTICIPANT_NOT_EXISTING_USER = 'One or more participant in your query does not exist';

export class EventControler {
    public getEvents = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Event);
        const events = await repository.find({ relations: ['owner'] });
        return res.status(200).json(events);
    });

    public getEventById = createAsyncRoute(async (req, res) => {
        const eventRepository = getRepository(Event);
        const event = await eventRepository.findOne(req.params.id, {
            relations: ['owner']
        });
        if (event) return res.status(200).json(event);
        return sendError(res, 404, EVENT404);
    });

    public createEvent = createAsyncRoute(async (req, res) => {
        const manager = getManager();
        console.log(req.body);
        const event = new Event();
        event.owner = req.body.userId;
        event.title = req.body.title;
        event.password = req.body.password;
        event.beginning = new Date(req.body.beginning);
        event.ending = new Date(req.body.ending);
        event.objective = req.body.objective ?? '';
        event.numberOfImages = 0;

        await validate(event);

        await manager.insert(Event, event);

        return res
            .status(201)
            .location(`api/v1/events/${event.id}`)
            .json(event);
    });

    public updateEvent = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Event);
        const event = await repository.findOne(req.params.id);
        if (!event) return sendError(res, 404, EVENT404);

        if (req.body.title) event.title = req.body.title;
        if (req.body.password) event.password = req.body.password;
        if (req.body.beginning) event.beginning = req.body.beginning;
        if (req.body.ending) event.ending = req.body.ending;
        if (req.body.objective) event.objective = req.body.objective;
        if (req.body.numberOfImages)
            event.numberOfImages = req.body.numberOfImages;

        await validate(event, { skipMissingProperties: true });

        await repository.save(event);

        return res.status(200).json(event);
    });

    public deleteEvent = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Event);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, EVENT404);
    });

    public getParticipants = createAsyncRoute(async (req, res) => {
        const manager = getManager();
        const event = await manager.findOne(Event, req.params.id, {
            relations: ['participants']
        });
        if (event.participants.length > 0)
            return res.status(200).json(event.participants);
        return sendError(res, 404, NO_PARTICIPANT);
    });

    public addParticipant = createAsyncRoute(async (req, res) => {
        const eventRepository = getRepository(Event);
        const userRepository = getRepository(User);

        const EVENT_ID = req.params.id;
        const event = await eventRepository.findOne(req.params.id);
        if (!event) return sendError(res, 404, EVENT404);
        

        if (!req.body.participants) {
            return sendError(res, 400, NO_PARTICIPANT_DEFINED);
        }

        const { participants } = req.body;

        if (!(participants instanceof Array) || participants.length <= 0) {
            return sendError(res, 400, NO_PARTICIPANT_DEFINED);
        }
        
        const loadedUser = await userRepository.find({
            relations: ['events'],
            where: {
                id: In(participants)
            }
        });

        if(loadedUser.length !== participants.length){
            return sendError(res, 400, EVENT_PARTICIPANT_NOT_EXISTING_USER);
        }
        
        const addedUser = [];

        for(const userToAddInEvent of loadedUser){
            if(!userToAddInEvent.events.find(e => e.id === event.id)){
                userToAddInEvent.events.push(event);
            }
            
            addedUser.push(await userRepository.save(userToAddInEvent));
        }


        return res.status(200).json({...event, participants: addedUser});
    });

    public getObservations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(Event);
        const e = await repository.findOne(req.params.id);
        if (!e) return sendError(res, 404, EVENT404);
        const event = await repository.findOne(req.params.id, {
            relations: ['observations']
        });
        return res.status(200).json(event.observations);
    });
}