import { createAsyncRoute, validate } from "./utils";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Observation } from "../entity/Observation";
import { sendError } from "./ErrorController";
import { Event } from "../entity/Event";
import { Description, FrontendObstacle, Obstacle } from "../entity/Description";
import { dailyChallengeController } from ".";
import { ChallengeType } from '../entity/DailyChallenge';
import { Location } from "../entity/Location";
import { ObservationEvaluation } from "../entity/ObservationEvaluation";
import { ObservationValidation } from "../entity/ObservationValidation";

const VALIDATION404 = 'Observation\'s validation does not exist';
const OBSERVATION404 = 'Observation validation does not exist';

export class ObservationValidationController {

    public getValidations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationValidation);
        const observationValidations = await repository.find();
        return res.status(200).json(observationValidations);
    });

    public getValidationById = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationValidation);
        const observationValidation = await repository.findOne(req.params.id);
        if (observationValidation) return res.status(200).json(observationValidation);
        return sendError(res, 404, VALIDATION404);
    });

    public createValidation = createAsyncRoute(async (req, res) => {
        const manager = getManager();

        const validation = new ObservationValidation();
        validation.owner = req.body.userId;
        validation.newWeight = req.body.newWeight;
        validation.oldWeight = req.body.oldWeight;
        validation.weightOk = req.body.weightOk;
        validation.createdAt = new Date();

        const observation = await manager.findOne(Observation, req.body.observation);
        if (!observation) return sendError(res, 404, OBSERVATION404);
        validation.observation = observation;

        await validate(validation);
        await manager.insert(ObservationValidation, validation);
        await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.VALIDATION);
        return res.status(201)
            .location(`api/v1/validations/${validation.id}`)
            .json(validation);
    });

    public deleteValidation = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationValidation);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, VALIDATION404);
    });
}
