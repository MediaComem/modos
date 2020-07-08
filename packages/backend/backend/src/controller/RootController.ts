import { Request, Response } from "express";

const pkg = require('../../package.json')

export class RootController {

    public getRoot(req: Request, res: Response) {
        return res.status(200).json({
            version: pkg.version
        })
    }
}
