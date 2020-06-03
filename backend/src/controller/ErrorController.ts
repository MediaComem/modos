import { Response } from 'express';
import { ValidationError } from 'class-validator';

export const handleError = (err: any, res: Response) => {
    // Check unique constraint violation
    if (err.code == 23505) return sendError(res, 409, err.detail);

    // Invalid text representation in the database (e.g. enum with invalid value)
    if (err.code == '22P02') return sendError(res, 400, err.message);

    // Entity validation error
    if (err instanceof Array) return sendError(res, 400, err.toString())

    return sendError(res, 500, String(err));
};

export const sendError = (res: Response, code: number, message: string) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
};

