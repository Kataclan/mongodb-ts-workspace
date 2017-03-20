import * as $ from 'jquery';

import { IRequest, IResponse, IResponseStatus } from "../interfaces/Base";
import { SAuth } from "../interfaces/SAuth";
import { SApp } from "../interfaces/SApp";
import { SNode } from "../interfaces/SNode";
import { SUser } from "../interfaces/SUser";

import { Node } from "../../models/nodes/Node";
import { User } from "../../models/users/User";
import { IAjaxError } from "./Ajax";

export class Client {
    public baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public execute<TRes extends IResponse>(req: IRequest): Promise<TRes> {
        let apiUrl = this.baseUrl + req.url;
        return new Promise<TRes>((resolve, reject) => {
            $.ajax({
                url: apiUrl,
                type: "POST",
                data: req,
                dataType: 'json'
            })
                .done((data, textStatus, jqXHR) => {
                    resolve(data as TRes);
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    reject({
                        responseStatus: {
                            errorCode: "500",
                            message: "no server response"
                        } as IResponseStatus
                    } as IResponse)
                });
        });
    }
}
