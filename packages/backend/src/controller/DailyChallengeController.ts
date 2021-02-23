import * as bcrypt from 'bcrypt';
import { sendError } from './ErrorController';
import { createAsyncRoute, signToken, validate, today, getRandomInt } from './utils';
import { getRepository, getManager, getConnection, ObjectID } from 'typeorm'
import { User } from '../entity/User';
import { Event } from '../entity/Event';
import { Observation } from '../entity/Observation';
import { ObservationEvaluation } from '../entity/ObservationEvaluation';
import { ObservationValidation } from '../entity/ObservationValidation';
import { ObservationLabelisation } from '../entity/ObservationLabelisation';
import { DailyChallenge, ChallengeType } from '../entity/DailyChallenge';


const USER404 = 'User does not exist';

export class DailyChallengeController {
    public getUserChallengesScore = async function(userId) {
        const challengeRepository = getRepository(DailyChallenge);
        let {sum} = await challengeRepository.createQueryBuilder("challenge")
            .select("SUM(challenge.points)", "sum")
            .where("challenge.nbCrt=challenge.nbGoal")
            .andWhere('"challenge"."ownerId" = :owner', {owner: userId})
            .getRawOne(); 
        if (sum) return sum;
        return 0;
    };

    public createNewChallenges = async function(userId,validation) {
        var challenges = [] as DailyChallenge[];
        const manager = getManager();
        // For everyone add 10 Label + 10 Eval
        const challenge1 = new DailyChallenge();
        challenge1.owner = userId;
        challenge1.nbCrt = 0;
        challenge1.nbGoal = 10;
        challenge1.type = ChallengeType.LABELISATION;
        challenge1.points = 17;
        challenge1.date = today();
        await validate(challenge1);
        await manager.insert(DailyChallenge, challenge1);
        challenges.push(challenge1)
        const challenge2 = new DailyChallenge();
        challenge2.owner = userId;
        challenge2.nbCrt = 0;
        challenge2.nbGoal = 5;
        challenge2.type = ChallengeType.EVALUATION;
        challenge2.points = 50;
        challenge2.date = today();
        await validate(challenge2);
        await manager.insert(DailyChallenge, challenge2);
        challenges.push(challenge2)
        const challenge3 = new DailyChallenge();
        challenge3.owner = userId;
        challenge3.nbCrt = 0;
        challenge3.nbGoal = 10;
        challenge3.type = ChallengeType.VALIDATION;
        challenge3.points = 90;
        challenge3.date = today();
        await validate(challenge3);
        await manager.insert(DailyChallenge, challenge3);
        challenges.push(challenge3)
        /*for (var i = 0; i < 2; i++) {
            const challenge = new DailyChallenge();
            challenge.owner = userId;

            challenge.nbCrt = 0;
            challenge.nbGoal = (getRandomInt(2) + 1) * 5;
            var noType = getRandomInt(validation?3:2);
            if (noType == 0) {
                challenge.type = ChallengeType.EVALUATION;
            } else if (noType == 1) {
                challenge.type = ChallengeType.LABELISATION;
            } else {
                challenge.type = ChallengeType.VALIDATION;
            }
            challenge.points = 20 + 10 * noType;
            if (challenge.nbGoal == 10) {
                challenge.points = challenge.points * 2 + 10;
            }

            challenge.date = today();
            await validate(challenge);
            await manager.insert(DailyChallenge, challenge);
            challenges.push(challenge)
        }*/
        return challenges;
    };


    public getTodayChallenges = async function(userId) {
        const challengeRepository = getRepository(DailyChallenge);
        var challenges = await challengeRepository.find({ where:{owner: userId, date: today()}});
        return challenges;
    };

    public incChallenges = async function(userId, type){
        await getConnection().createQueryBuilder()
            .update(DailyChallenge)
            .set({"nbCrt": () => '"nbCrt" + 1'})
            .where('"nbCrt"<"nbGoal"')
            .andWhere("date = :date", { date: today() })
            .andWhere("type = :type", {type: type})
            .andWhere('"ownerId" = :owner', {owner: userId})
            .execute()
    }
}