import { createAsyncRoute, validate } from "./utils";
import { sendError } from "./ErrorController";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";


export class ProfileController {

    private USER404 = 'User does not exist';
    private PROFILE422 = 'Profile already exists'
    private PROFILE404 = 'Profile does not exist';

    public getProfile = createAsyncRoute(async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, this.USER404);
        if (!user.profile) return sendError(res, 404, this.PROFILE404);
        return res.status(200).json(user.profile);
    });

    public createProfile = createAsyncRoute(async (req: Request, res: Response) => {
        const profileRepository = getRepository(Profile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, this.USER404);
        if (user.profile) return sendError(res, 409, this.PROFILE422);

        const profile = new Profile();
        profile.age = req.body.age;
        profile.gender = req.body.gender;
        profile.helper = req.body.helper;
        profile.helperFrequency = req.body.helperFrequency;
        profile.mobility = req.body.mobility;

        await validate(profile);

        user.profile = await profileRepository.save(profile);
        const updatedUser = await userRepository.save(user);
        return res.status(201).json(updatedUser.profile);
    });


    public updateProfile = createAsyncRoute(async (req: Request, res: Response) => {
        const profileRepository = getRepository(Profile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, this.USER404);
        if (!user.profile) return sendError(res, 404, this.PROFILE404);

        if (req.body.age) user.profile.age = req.body.age;
        if (req.body.gender) user.profile.gender = req.body.gender;
        if (req.body.helper) user.profile.helper = req.body.helper;
        if (req.body.helperFrequency) user.profile.helperFrequency = req.body.helperFrequency;
        if (req.body.mobility) user.profile.mobility = req.body.mobility;

        await validate(user.profile);

        const updatedProfile = await profileRepository.save(user.profile);

        return res.status(200).json(updatedProfile);
    });
}