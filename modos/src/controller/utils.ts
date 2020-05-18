import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleError } from './ErrorController';
import { secretBase, expirationTime } from '../config/config'

/**
 * Creates an Express route from an async function, automatically handling
 * rejected promises.
 */
export const createAsyncRoute = (asyncFunction: Function) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await asyncFunction(req, res, next);
        } catch (err) {
            return handleError(err, res);
        }
    };
};

export const signToken = function (userId: number): string {
    return jwt.sign({ sub: userId }, secretBase, { expiresIn: expirationTime });
};
