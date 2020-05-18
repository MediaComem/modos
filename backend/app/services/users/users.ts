import bcrypt from 'bcrypt';
import Event from '../../models/events';
import Observation from '../../models/observations';
import User from '../../models/users';
import { sendError } from '../errors';
import { createAsyncRoute, signToken } from '../utils';
import { Request, Response } from 'express';


export class UserService {

    public authenticate(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const user = await User.findOne({ email: req.body.email });
            const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash)
            if (isPasswordValid) return res.json({ code: 200, token: signToken(user._id) });
            return sendError(res, 401, 'Unauthorized');
        });
    }

    public getUser(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const user = await User.findById(req.body.userId);
            if (user) return res.status(200).json(user.toObject());
            return sendError(res, 404, 'User does not exist');
        });
    }

    public createUser(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const temp = User();
            temp.pseudonym = req.body.pseudonym;
            temp.email = req.body.email;
            await temp.encryptPassword(req.body.password);

            const newUser = await User.create(temp);

            return res.status(201)
                .location(`api/v1/users`)
                .json(newUser.toObject());
        });
    }

    public updateUser(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const userId = req.body.userId;
            const temp = {
                pseudonym: req.body.pseudonym,
                email: req.body.email,
                password: req.body.password
            };
            const updatedUser = await User.findByIdAndUpdate(userId, temp, {
                new: true,
                runValidators: true
            });
            if (updatedUser) return res.status(200).json(updatedUser.toObject());
            return sendError(res, 404, 'User does not exist');
        });
    }

    public deleteUser(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const user = await User.findByIdAndRemove(req.body.userId);
            if (user) return res.status(204).json({});
            return sendError(res, 404, 'User does not exist');
        });
    }

    public getUserEvents(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const userEvents = await Event.find({ owner: req.body.userId });
            if (userEvents) return res.status(200).json(userEvents);
            return sendError(res, 404, 'User does not exist');
        });
    }

    public getUserObservations(req: Request, res: Response) {
        createAsyncRoute(async (req: Request, res: Response) => {
            const observations = await Observation.find({ owner: req.body.userId });
            if (observations) return res.status(200).json(observations);
            return sendError(res, 404, 'User does not exist');
        });
    }

    public joinEvent(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const user = await User.findById(req.body.userId);
            if (!user) return sendError(res, 404, 'User does not exist');

            const event = await Event.findById(req.params.eventId, '_id');
            if (!event) return sendError(res, 404, 'Event does not exist');
            if (user.events.includes(event._id)) {
                return sendError(res, 422, 'User already joined the event');
            }

            user.events.push(event._id);
            const updatedUser = await user.save();
            return res.status(200).json(updatedUser.toObject());
        });
    }
};