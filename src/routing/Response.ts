import * as express from 'express';
import { DBException } from "../db/DBException";
import { IResponse, IResponseStatus, IResponseError } from "../../lib/core-lib/src";

export class Response {

    public static send(res: express.Response, value: IResponse): void;
    public static send(res: express.Response, value: IResponse, message: string): void;
    static send(res: express.Response, value: IResponse, message?: string) {
        value.responseStatus = {
            errorCode: "200",
            message: message ? message : "ok"
        } as IResponseStatus;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(value));
    }
    static sendMessage(res: express.Response, message: string) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            errorCode: "200",
            message: message
        } as IResponseStatus));
    }
    public static sendError(res: express.Response, arg0: any) {

        if (arg0 instanceof DBException) {
            var err = arg0 as DBException;
            var exception = {
                errorCode: "500",
                message: JSON.stringify(err)
            } as IResponseStatus;
            res.status(500).send(JSON.stringify(exception));
        }
        else if ("responseStatus" in arg0) {
            var response = arg0 as IResponseStatus;
            response.errorCode = "500";
            res.status(500).send(JSON.stringify(response));
        }
        else if (typeof arg0 === "string") {
            res.status(500).send(JSON.stringify({
                errorCode: "500",
                message: arg0
            } as IResponseStatus));
        }
        else {
            res.status(500).send(JSON.stringify({
                errorCode: "500",
                message: ("message" in arg0) ? arg0.message : "",
                stackTrace: ("stackTrace" in arg0) ? arg0.stackTrace : null,
            } as IResponseStatus));
        }
    }
}