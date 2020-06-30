import { validate as validateClass, ValidatorOptions } from "class-validator";
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { handleError } from './ErrorController';
import { secretBase, expirationTime } from '../config/config'
import { ClassValidationError } from './errors';

/**
 * Creates an Express route from an async function, automatically handling
 * rejected promises.
 */
export const createAsyncRoute = (asyncFunction: (req: Request, res: Response, next: NextFunction) => void | Promise<void>) => {
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

export const validate = async function(object: Object, options?: ValidatorOptions) {
    const errors = await validateClass(object, options);
    if (errors.length > 0) throw new ClassValidationError(errors);
};
