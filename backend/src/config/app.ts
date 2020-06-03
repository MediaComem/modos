import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as router from '../router';


export class App {

    private server = express();

    constructor(config: any) {

        // Set all the server things.
        this.server.set('env', config.env);
        this.server.set('port', config.port);

        // View engine setup.
        this.server.set('views', path.join(__dirname, '../views'));
        this.server.set('view engine', 'pug');

        // Add middleware to parse the json.
        this.server.use(bodyParser.json({
            limit: config.payloadLimit,
            type: 'application/json'
        }));
        this.server.use(bodyParser.urlencoded({
            limit: config.payloadLimit,
            extended: false
        }));

        // Allow CORS.
        this.server.use(cors({
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            preflightContinue: false,
            origin: "*",
        }));

        // Set up router.
        router.init(this.server);

        this.server.use(function (err: any, req: Request, res: Response, next: NextFunction) {
            // Set locals, only providing error in development.
            res.locals.message = err.message;
            res.locals.error = config.env === 'development' ? err : {};

            res.status(err.status || 500);
            res.json();
        });
    }

    public start() {
        const port = this.server.get('port');
        this.server.listen(port, function () {
            console.log('Express server listening on - http://localhost:' + port);
        });
    }
}