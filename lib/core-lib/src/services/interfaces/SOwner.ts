import { Owner } from "../../models/owners/Owner";
import { IRequest, IResponse, IResponseStatus } from "./Base";

export module SOwner {

    export class InsertOneRequest implements IRequest {
        url: string;
        public owner: Owner
        constructor(owner: Owner) {
            this.url = "/sowner/insertOne";
            this.owner = owner;
        }
    }
    export interface InsertOneResponse extends IResponse {
        owner: Owner;
    }
}