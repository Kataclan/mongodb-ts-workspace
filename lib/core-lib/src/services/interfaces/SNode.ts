import { Node } from "../../models/nodes/Node";
import { App } from "../../models/apps/App";
import { IRequest, IResponse, IResponseStatus } from "./Base";

export module SNode {
    export class InsertOneRequest implements IRequest {
        url: string
        public node: Node;
        constructor(node: Node) {
            this.url = "/snode/insertOne";
            this.node = node;
        }
    }
    export interface InsertOneResponse extends IResponse {
        node: Node;
    }

    export class FindOneRequest implements IRequest {
        url: string
        public uid: string;
        constructor(uid: string) {
            this.url = "/snode/findOne";
            this.uid = uid;
        }
    }
    export interface FindOneResponse extends IResponse {
        node: Node,
        apps: App[];
    }

    export class UpdateOneRequest implements IRequest {
        url: string
        public node: Node;
        constructor(node: Node) {
            this.url = "/snode/updateOne";
            this.node = node;
        }
    }
    export interface UpdateOneResponse extends IResponse {
        node: Node,
    }
}