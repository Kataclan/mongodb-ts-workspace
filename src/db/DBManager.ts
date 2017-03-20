import * as mongodb from 'mongodb';
import * as assert from 'assert';

export class DBManager {
    private _client: mongodb.MongoClient;
    private _db: mongodb.Db;

    constructor(url: string, callback?: () => void) {
        this._client = new mongodb.MongoClient();
        this._client.connect(url, (error, db) => {
            if (error) {
                console.error(`DB Connection error: ${error.message}`);
            } else {
                console.log("DB Connection successfull");
                this._db = db;
            }
            if (callback) {
                callback();
            }
        });
    }
    get DB(): mongodb.Db {
        return this._db;
    }
}



