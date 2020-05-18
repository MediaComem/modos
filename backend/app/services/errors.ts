import { Response } from 'express';

export const handleError = (err: any, res: Response) => {
    // Check if it's a Mongoose validation error.
    if (err.errors) {
        // Retrieve each error message if there are multiple errors.
        const message = Object.keys(err.errors).map((key) => {
            return err.errors[key].message;
        }).toString();
        return sendError(res, 422, message);
    }
    // Check unique constraint violation (not considered as a validation error by mongo).
    if (err.code === 11000) return sendError(res, 409, err.errmsg);
    return sendError(res, 500, err);
};

export const sendError = (res: Response, code: number, message: string) => {
    return res.status(code).json({
        'code': code,
        'message': message
    });
};

