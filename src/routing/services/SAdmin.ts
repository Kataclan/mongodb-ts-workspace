import { ObjectID } from "mongodb";
import * as express from 'express';
import { DB } from '../../db/DB';
import { App, AppSettings } from "../../../lib/core-lib/src";
import { Response } from '../Response';
import { Version } from "../../../lib/core-lib/src"

var router = express.Router();

router.use("/executeDefault", async (req, res) => {
    try {
        // Write your code
    }
    catch (ex) {
        Response.sendError(res, ex);
    }
});

export default router;