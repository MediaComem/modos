import * as bcrypt from 'bcrypt';
import { sendError } from './ErrorController';
import { createAsyncRoute, signToken, validate, today, getRandomInt } from './utils';
import { getRepository, getManager, ObjectID } from 'typeorm'
import { User } from '../entity/User';
import { Event } from '../entity/Event';
import { Observation } from '../entity/Observation';
import { ObservationEvaluation } from '../entity/ObservationEvaluation';
import { ObservationValidation } from '../entity/ObservationValidation';
import { ObservationLabelisation } from '../entity/ObservationLabelisation';
import { dailyChallengeController } from '.'


const USER404 = 'User does not exist';

export class MenuController {

    public getMenuData = createAsyncRoute(async (req, res) => {
        const userid = req.body.userId;
        const user = await this.getUser(userid);
        const labelisations = await this.getUserLabelisations(userid);
        const evaluations = await this.getUserEvaluations(userid);
        const validations = await this.getUserValidations(userid);
        const canLabelise = await this.hasObstaclesToLabelise(userid);
        const canEvaluate = await this.hasObstacleToEvaluate(userid);
        const canValidate = await this.hasObstaclesToValidate(userid);
        var todayChallenges = await dailyChallengeController.getTodayChallenges(userid);

        if (!todayChallenges || todayChallenges.length < 3) {
            todayChallenges = await dailyChallengeController.createNewChallenges(userid, true);
        }
        const challengeScore = await dailyChallengeController.getUserChallengesScore(userid);
        if (user) return res.status(200).json({ 'user': user, 'labelisations': labelisations, 'evaluations': evaluations, 'validations': validations, 'todayChallenges': todayChallenges, 'challengeScore': challengeScore, 'canLabelise': canLabelise, 'canEvaluate': canEvaluate, 'canValidate': canValidate });
        return sendError(res, 404, USER404);
    });

    public getUser = async function (userid) {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(userid);
        return user;
    };

    public getUserLabelisations = async function (user) {
        const labelisationRepository = getRepository(ObservationLabelisation);
        const labelisations = await labelisationRepository.find({ where: { owner: user }, relations: ["observation"] });
        if (labelisations) return labelisations;
        return [];
    };

    public getUserEvaluations = async function (user) {
        const evaluationRepository = getRepository(ObservationEvaluation);
        const evaluations = await evaluationRepository.find({ where: { owner: user }, relations: ["observation"] });
        if (evaluations) return evaluations;
        return [];
    };

    public getUserValidations = async function (user) {
        const validationRepository = getRepository(ObservationValidation);
        const validations = await validationRepository.find({ where: { owner: user }, relations: ["observation"] });
        if (validations) return validations;
        return [];
    };

    public hasObstaclesToLabelise = async function (user) {
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(l.id) labelisation_nb")
            .leftJoin("observation_labelisation", "l", "l.observation=o.id")
            .where('(SELECT COUNT(l2.id) FROM "observation_labelisation" l2 WHERE l2."observationId"=o.id AND l2."ownerId"=' + user + ' )=0')
            .groupBy("o.id")
            .orderBy("labelisation_nb")
            .limit(5)
            .getMany();
        return observations.length > 0;
    };

    public hasObstacleToEvaluate = async function (user) {
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(e.id) evaluation_nb")
            .leftJoin("observation_evaluation", "e", "e.observation=o.id")
            .where('(SELECT COUNT(e2.id) FROM "observation_evaluation" e2 WHERE e2."observationId"=o.id AND e2."ownerId"=' + user + ' )=0')
            .groupBy("o.id")
            .orderBy("evaluation_nb")
            .limit(5)
            .getMany();
        return observations.length > 0;
    };

    public hasObstaclesToValidate = async function (user) {
        const observations = await getRepository(Observation)
            .createQueryBuilder("o")
            .addSelect("COUNT(e.id) evaluation_nb")
            .addSelect("COUNT(v.id) validation_nb")
            .leftJoin("observation_evaluation", "e", "e.observation=o.id")
            .leftJoin("observation_validation", "v", "v.observation=o.id")
            .where('(SELECT COUNT(v2.id) FROM "observation_validation" v2 WHERE v2."observationId"=o.id AND v2."ownerId"=' + user + ' )=0')
            .having("COUNT(e.id) > 0")
            .groupBy("o.id")
            .orderBy("validation_nb")
            .limit(5)
            .getMany();
        return observations.length > 0;
    };
}
