import { createAsyncRoute, validate } from "./utils";
import { sendError } from "./ErrorController";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { SofaProfile } from "../entity/SofaProfile";

const USER404 = 'User does not exist';
const PROFILE404 = 'Profile does not exist';
const PROFILE409 = 'Profile already exists'

export class SofaProfileController {

    public getSofaProfile = createAsyncRoute(async (req, res) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.sofaProfile) return sendError(res, 404, PROFILE404);
        return res.status(200).json(user.sofaProfile);
    });

    public createSofaProfile = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(SofaProfile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        if (!user) return sendError(res, 404, USER404);
        if (user.sofaProfile) return sendError(res, 409, PROFILE409);

        const profile = new SofaProfile();
        profile.ageRange = req.body.ageRange;
        profile.helper = req.body.helper;
        profile.disabledProfilesMask = 0;
        profile.hidePassModal = false;

        await validate(profile);

        user.sofaProfile = await profileRepository.save(profile);
        const updatedUser = await userRepository.save(user);
        return res.status(201).json(updatedUser.sofaProfile);
    });

    public updateSofaProfile = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(SofaProfile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.sofaProfile) return sendError(res, 404, PROFILE404);

        if (req.body.ageRange) user.sofaProfile.ageRange = req.body.ageRange;
        if (req.body.helper) user.sofaProfile.helper = req.body.helper;

        await validate(user.sofaProfile);

        const updatedProfile = await profileRepository.save(user.sofaProfile);

        return res.status(200).json(updatedProfile);
    });

    public updateDisabledProfilesMask = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(SofaProfile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.sofaProfile) return sendError(res, 404, PROFILE404);

        if (req.body.disabledProfilesMask) user.sofaProfile.disabledProfilesMask = req.body.disabledProfilesMask;

        await validate(user.sofaProfile);

        const updatedProfile = await profileRepository.save(user.sofaProfile);

        return res.status(200).json(updatedProfile);
    });

    public updateHidePassModal = createAsyncRoute(async (req, res) => {
        const profileRepository = getRepository(SofaProfile);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.body.userId, { relations: ["sofaProfile"] });
        if (!user) return sendError(res, 404, USER404);
        if (!user.sofaProfile) return sendError(res, 404, PROFILE404);

        if (req.body.hidePassModal) user.sofaProfile.hidePassModal = req.body.hidePassModal;

        await validate(user.sofaProfile);

        const updatedProfile = await profileRepository.save(user.sofaProfile);

        return res.status(200).json(updatedProfile);
    });
}