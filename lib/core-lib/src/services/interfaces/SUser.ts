import { User } from "../../models/users/User";
import { IRequest, IResponse, IResponseStatus } from "./Base";

export module SUser {
    export class FindAllRequest implements IRequest {
        url: string;
        constructor() {
            this.url = "/suser/findAll";
        }

    }
    export interface FindAllResponse extends IResponse {
        users: User[];
    }

    export class InsertOneRequest implements IRequest {
        url: string;
        public user: User
        constructor(user: User) {
            this.url = "/suser/insertOne";
            this.user = user;
        }
    }
    export interface InsertOneResponse extends IResponse {
        user: User;
    }

    export class UpdateOneRequest implements IRequest {
        url: string;
        public user: User
        constructor(user: User) {
            this.url = "/suser/updateOne";
            this.user = user;
        }
    }
    export interface UpdateOneResponse extends IResponse {
        user: User;
    }
}