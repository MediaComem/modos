import * as express from 'express';
import { apiRouter } from './apis';
import { Request, Response, NextFunction } from 'express';


// Router initialization.
export function init(server: express.Application) {

    // Logger middleware.
    server.use(function (req: Request, res: Response, next: NextFunction) {
        console.log("[ " + req.method + " ] " + req.originalUrl);
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
    server.use('/landing-page', express.static('./src/public'));
}