import { Model } from "../Model"

export interface Connection extends Model {
    date: Date;
    node_uid: string;
    username: string;
}
