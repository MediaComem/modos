import { Request, Response } from 'express';

const pkg = require('../../../package.json');


export const getRoot = (req: Request, res: Response) => {
    return res.status(200).json({
        version: pkg.version
    });
};
