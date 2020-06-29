import { createAsyncRoute, validate } from "./utils";
import { sendError } from "./ErrorController";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

const USER404 = 'User does not exist';
const PROFILE404 = 'Profile does not exist';
const PROFILE409 = 'Profile already exists'

export class ProfileController {

    public getProfile = createAsyncRoute(async (req, res) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.profile) return sendError(res, 404, PROFILE404);
        return res.status(200).json(user.profile);
    });

    public createProfile = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(Profile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, USER404);
        if (user.profile) return sendError(res, 409, PROFILE409);

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

    public updateProfile = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(Profile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["profile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.profile) return sendError(res, 404, PROFILE404);

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