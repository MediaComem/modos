import express from 'express';
import { apiRouter } from './apis';
import { Request, Response, NextFunction } from 'express';

export const init = (server: any) => {
    server.use(function (req: Request, res: Response, next: NextFunction) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    // POST and PUT must have a content type of application/json.
    server.use(function (req: Request, res: Response, next: NextFunction) {
        const contentType = req.get('Content-Type');
        if (['POST', 'PUT'].includes(req.method) && contentType !== 'application/json') {
            return res.status(415).json({
                'code': 415,
                'message': 'Unsupported Media Type',
                'description': 'All POST/PUT request must have a content type of application/json'
            });
        }
        return next();
    });

    server.use('/api', apiRouter);
    server.use('/landing-page', express.static('./app/public'));
};