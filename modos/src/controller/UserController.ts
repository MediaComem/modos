import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { sendError } from './ErrorController';
import { createAsyncRoute, signToken } from './utils';
import { getManager } from 'typeorm'
import { User } from '../entity/User';

export class UserController {

    public getUser(req: Request, res: Response) {
        createAsyncRoute(async (req: Request, res: Response) => {

            const userRepository = getManager().getRepository(User);
            const user = await userRepository.findOne({ email: req.body.email });

            const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash);
            if (isPasswordValid) {
                return res.json({ code: 200, token: signToken(user.id) });
            }
            
            return sendError(res, 401, 'Unauthorized');
        });
    }
}