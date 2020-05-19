import * as jwt from 'jsonwebtoken';
import { secretBase } from './config';
import { sendError } from '../controller/ErrorController';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that verify if the request contains a JWT token in the
 * Authorization header field. If that is the case, extract the userId
 * from the token.
 */
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return sendError(res, 401, 'Unauthorized');
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) return sendError(res, 401, 'Unauthorized');
    const token = match[1];
    jwt.verify(token, secretBase, function (err, decoded: any) {
        if (err) return sendError(res, 401, 'Unauthorized');
        req.body.userId = decoded.sub;
        next();
    });
};
