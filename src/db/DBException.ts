import * as mongodb from 'mongodb';

export class DBException {
    public name: string;
    public message: string;
    constructor(error: mongodb.MongoError) {
        this.name = error.name;
        this.message = error.message;
    }
}