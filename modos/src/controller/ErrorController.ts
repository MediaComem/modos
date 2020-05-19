import { Response } from 'express';

export const handleError = (err: any, res: Response) => {;
    // Check unique constraint violation
    if (err.code == 23505) return sendError(res, 409, err.detail);

    console.log("ERROR: ", err);

    return sendError(res, 500, err);
};

export const sendError = (res: Response, code: number, message: string) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
};

