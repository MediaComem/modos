import User from '../../models/users';
import { sendError } from '../errors';
import { createAsyncRoute } from '../utils';
import { Request, Response } from 'express';


export class ProfileService {
    public getProfile(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const user = await User.findById(req.body.userId);
            if (!user) return sendError(res, 404, 'User does not exist');
            if (!user.profile) return sendError(res, 404, 'Profile does not exist');
            return res.status(200).json(user.profile.toObject());
        });
    }

    public createProfile(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const userId = req.body.userId;
            const user = await User.findById(userId);

            if (!user) return sendError(res, 404, 'User does not exist');

            console.log(req.body);

            user.profile = req.body;
            const updatedUser = await user.save();

            return res.status(201).json(updatedUser.profile.toObject());
        });
    }

    public updateProfile(req: Request, res: Response) {
        return createAsyncRoute(async (req: Request, res: Response) => {
            const userId = req.body.userId;
            const user = await User.findById(userId);

            if (!user) return sendError(res, 404, 'User does not exist');
            if (!user.profile) return sendError(res, 404, 'Profile does not exist');

            Object.assign(user.profile, req.body);
            const updatedUser = await user.save();

            return res.status(200).json(updatedUser.profile.toObject());
        });
    }

}