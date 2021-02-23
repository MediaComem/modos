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
export const createAsyncRoute = (asyncFunction: (req: Request, res: Response, next: NextFunction) => any | Promise<any>) => {
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

export const today = function() {
    var d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

export const getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}