import * as express from 'express';
import { DB } from '../../db/DB';
import {
    User,
    UserRoles,
    SUser
} from "../../../lib/core-lib/src";
import { Response } from '../Response';

var router = express.Router();

router.use("/findAll", async (req, res) => {
    try {
        let users = await DB.User.findAllAsync();
        Response.send(res, {
            users: users
        } as SUser.FindAllResponse);
    }
    catch (ex) {
        Response.sendError(res, ex);
    }
});

router.use("/insertOne", async (req, res) => {
    let request = req.body as SUser.InsertOneRequest;
    var newUser = Object.assign({} as User, request.user)

    try {
        await DB.User.insertOneAsync(newUser);
        Response.send(res, {
            user: newUser
        } as SUser.InsertOneResponse);
    }
    catch (ex) {
        Response.sendError(res, ex);
    }
});

router.use("/updateOne", async (req, res) => {
    let request = req.body as SUser.UpdateOneRequest;

    try {
        await DB.User.updateOneAsync(request.user);
        Response.send(res, {
            user: request.user
        } as SUser.InsertOneResponse);
    }
    catch (ex) {
        Response.sendError(res, ex);
    }
});

export default router;