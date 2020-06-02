import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { sendError } from './ErrorController';
import { createAsyncRoute, signToken } from './utils';
import { getRepository, getManager } from 'typeorm'
import { User } from '../entity/User';
import { Event } from '../entity/Event';
import { Observation } from '../entity/Observation';

export class UserController {

    private USER404 = 'User does not exist';
    private EVENT404 = 'Event does not exist';
    private USER_ALREADY_JOINED_EVENT = 'User already joined the event';

    public authenticate = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ email: req.body.email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash);
            if (isPasswordValid) {
                return res.json({ code: 200, token: signToken(user.id) });
            }
        }

        return sendError(res, 401, 'Unauthorized');
    });


    public getUser = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.body.userId);
        if (user) return res.status(200).json(user);
        return sendError(res, 404, this.USER404);
    });

    public createUser = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);

        const newUser = new User();
        newUser.pseudonym = req.body.pseudonym;
        newUser.email = req.body.email;
        newUser.events = new Array<Event>();
        await newUser.hashPassword(req.body.password);

        await userRepository.insert(newUser);

        return res.status(201)
            .location(`api/v1/users`)
            .json(newUser);
    });


    public updateUser = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);

        const user = new User();
        user.id = req.body.userId
        user.pseudonym = req.body.pseudonym;
        user.email = req.body.email;
        if (req.body.password) await user.hashPassword(req.body.password);

        await userRepository.save(user);
        const updatedUser = await userRepository.findOne(user.id);
        if (updatedUser) return res.status(200).json(updatedUser);

        return sendError(res, 404, this.USER404);
    });


    public deleteUser = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const result = await userRepository.delete(req.body.userId);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, this.USER404);
    });


    public getUserEvents = createAsyncRoute(async (req: Request, res: Response) => {
        const eventRepository = getRepository(Event);
        const userEvents = await eventRepository.find({ owner: req.body.userId });
        if (userEvents) return res.status(200).json(userEvents);
        return sendError(res, 404, this.USER404);
    });


    public getUserObservations = createAsyncRoute(async (req: Request, res: Response) => {
        const observationRepository = getRepository(Observation);
        const observations = await observationRepository.find({ owner: req.body.userId });
        if (observations) return res.status(200).json(observations);
        return sendError(res, 404, this.USER404);
    });


    public joinEvent = createAsyncRoute(async (req: Request, res: Response) => {
        const manager = getManager();

        const user = await manager.findOne(User, req.body.userId, { relations: ["events"] });
        if (!user) return sendError(res, 404, this.USER404);

        const event = await manager.findOne(Event, req.params.eventId);
        if (!event) return sendError(res, 404, this.EVENT404);

        user.events.forEach((e: Event) => {
            if (e.id == event.id) {
                return sendError(res, 422, this.USER_ALREADY_JOINED_EVENT);
            }
        });

        user.events.push(event);
        const updatedUser = await manager.save(user);
        return res.status(200).json(updatedUser);
    });
}