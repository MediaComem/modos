import { createAsyncRoute, validate } from "./utils";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Observation } from "../entity/Observation";
import { sendError } from "./ErrorController";
import { ObservationLabelisation } from "../entity/ObservationLabelisation";
import { dailyChallengeController } from ".";
import { ChallengeType } from '../entity/DailyChallenge';

const LABELISATION404 = 'Observation\'s labelsiation does not exist';
const OBSERVATION404 = 'Observation does not exist';

export class ObservationLabelisationController {

    public getLabelisations = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationLabelisation);
        const labelisations = await repository.find();
        return res.status(200).json(labelisations);
    });

    public getLabelisationById = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationLabelisation);
        const labelisation = await repository.findOne(req.params.id);
        if (labelisation) return res.status(200).json(labelisation);
        return sendError(res, 404, LABELISATION404);
    });

    public createLabelisation = createAsyncRoute(async (req, res) => {
        const manager = getManager();

        const labelisation = new ObservationLabelisation();
        labelisation.owner = req.body.userId;
        labelisation.obstacle = req.body.obstacle;
        labelisation.createdAt = new Date();
        labelisation.freeText = req.body.freeText;

        if("observation" in req.body){
            const observation = await manager.findOne(Observation, req.body.observation);
            if (!observation) return sendError(res, 404, OBSERVATION404);
            labelisation.observation = observation;

            await validate(labelisation);
            await manager.insert(ObservationLabelisation, labelisation);
            await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.LABELISATION);
            return res.status(201)
                .location(`api/v1/labelisations/${labelisation.id}`)
                .json(labelisation);
        }else{
            var results = []
            if(req.body.observation1>0){
                const observation = await manager.findOne(Observation, req.body.observation1);
                if (!observation) return sendError(res, 404, OBSERVATION404);
                labelisation.observation = observation;

                await validate(labelisation);
                await manager.insert(ObservationLabelisation, labelisation);
                await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.LABELISATION);
                results.push(labelisation);
            }
            if(req.body.observation2>0){
                const observation = await manager.findOne(Observation, req.body.observation2);
                if (!observation) return sendError(res, 404, OBSERVATION404);
                labelisation.observation = observation;

                await validate(labelisation);
                await manager.insert(ObservationLabelisation, labelisation);
                await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.LABELISATION);
                results.push(labelisation);
            }
            if(req.body.observation3>0){
                const observation = await manager.findOne(Observation, req.body.observation3);
                if (!observation) return sendError(res, 404, OBSERVATION404);
                labelisation.observation = observation;

                await validate(labelisation);
                await manager.insert(ObservationLabelisation, labelisation);
                await dailyChallengeController.incChallenges(req.body.userId, ChallengeType.LABELISATION);
                results.push(labelisation);
            }

            return res.status(201).location(`api/v1/labelisations/`).json(results);
        }
    });

    public deleteLabelisation = createAsyncRoute(async (req, res) => {
        const repository = getRepository(ObservationLabelisation);
        const result = await repository.delete(req.params.id);
        if (result.affected > 0) return res.status(204).json({});
        return sendError(res, 404, LABELISATION404);
    });
}
