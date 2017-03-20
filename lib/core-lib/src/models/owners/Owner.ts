import { Model } from "../Model";

export interface Owner extends Model {
    uid: string;
    name: string;
    tel: string;
    contact: string;
    parent: string;
}

export class OwnerEx {
}