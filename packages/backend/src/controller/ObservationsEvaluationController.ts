import { createAsyncRoute, validate } from "./utils";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Observation } from "../entity/Observation";
import { sendError } from "./ErrorController";
import { Event } from "../entity/Event";
import { Description, FrontendObstacle, Obstacle } from "../entity/Description";
import { Location } from "../entity/Location";
import { ObservationEvaluation } from "../entity/ObservationEvaluation";
import { dailyChallengeController } from ".";
import { ChallengeType } from '../entity/DailyChallenge';

const EVALUATION404 = 'Observation\'s evaluation does not exist';
const OBSERVATION404 = 'Observation does not exist';

export class ObservationEvaluationController {

    public getEvaluations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationEvaluation);
        const evaluations = await repository.find();
        return res.status(200).json(evaluations);
    });

    public getEvaluationById = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationEvaluation);
        const evaluation = await repository.findOne(req.params.id);
        if (evaluation) return res.status(200).json(evaluation);
        return sendError(res, 404, EVALUATION404);
    });

    public createEvaluation = createAsyncRoute(async (req, res) => {
        const manager = getManager();

        const evaluation = new ObservationEvaluation();
        evaluation.owner = req.body.userId;
        evaluation.weightNoHelper = req.body.weightNoHelper;
        evaluation.weightWalker = req.body.weightWalker;
        evaluation.weightWheelchair = req.body.weightWheelchair;
        evaluation.weightWhiteCane = req.body.weightWhiteCane;
        evaluation.createdAt = new Date();

        const observation = await manager.findOne(Observation, req.body.observation);
        if (!observation) return sendError(res, 404, OBSERVATION404);
        evaluation.observation = observation;

        await validate(evaluation);
        await manager.insert(ObservationEvaluation, evaluation);
        await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.EVALUATION);
        return res.status(201)
            .location(`api/v1/evaluations/${evaluation.id}`)
            .json(evaluation);
    });

    public deleteEvaluation = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationEvaluation);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, EVALUATION404);
    });
}
