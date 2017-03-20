import { Connection } from "../../models/connections/Connection";
import { IRequest, IResponse, IResponseStatus } from "./Base";

export module SConnection {

    export class InsertOneRequest implements IRequest {
        public url: string;
        public username: string;
        public node_uid: string
        constructor(username: string, node_uid: string) {
            this.url = "/sconnection/insertOne";
            this.username = username;
            this.node_uid = node_uid;
        }
    }
    export interface InsertOneResponse extends IResponse {
        connection: Connection;
    }
    export class DeleteOneRequest implements IRequest {
        public url: string;
        public username: string;
        public node_uid: string
        constructor(username: string, node_uid: string) {
            this.url = "/sconnection/deleteOne";
            this.username = username;
            this.node_uid = node_uid;
        }
    }
    export interface DeleteOneResponse extends IResponse {
    }
}