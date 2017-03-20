import * as mongodb from 'mongodb';
import { ObjectID } from 'mongodb';
import { DB } from './DB';
import { Model } from "../../lib/core-lib/src";
import { DBManager } from './DBManager';
import { DBException } from "./DBException";
import { DBInsertResult, DBUpdateResult, DBDeleteResult } from "./DBResults";


export class DBCollection<T extends Model>{
    protected CollectionName: string;
    protected DBManager: DBManager;
    protected PropertyId: string;

    constructor(dbManager: DBManager, collectionName: string, propertyId: string) {
        this.DBManager = dbManager;
        this.CollectionName = collectionName;
        this.PropertyId = propertyId;
    }
    public insertOne(model: T, callback: (error: DBException, result: DBInsertResult) => void) {
        this.DBManager.DB.collection(this.CollectionName, (error, collection) => {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                collection.insertOne(model, (error, result) => {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, new DBInsertResult(result));
                    }
                });
            }
        });
    }
    public insertOneAsync(model: T): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.insertOne(model, (err, model) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    public updateOne(model: T, callback: (error: DBException, result: DBUpdateResult) => void) {
        var __this = this;
        this.DBManager.DB.collection(this.CollectionName, (error, collection) => {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                var filter: any = {};
                if (__this.PropertyId == "_id") {
                    if ((model._id as any) instanceof ObjectID) {
                        filter = { "_id": model._id };
                    }
                    else if (typeof model._id === "string") {
                        let id = new ObjectID(model._id);
                        filter = { "_id": id };
                        (model as any)._id = id;
                    }
                    else
                        throw new Error("Error in update. Id property is not valid");
                }
                else {

                    filter[__this.PropertyId] = (model as any)[__this.PropertyId];
                }

                collection.replaceOne(filter, model, (error, result) => {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, new DBUpdateResult(result));
                    }
                });
            }
        });
    }
    public updateOneAsync(model: T): Promise<{}> {
        return new Promise((resolve, reject) => {
            var json =
                this.updateOne(model, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else if (result.n != 1) {
                        reject({
                            name: "update",
                            message: "no update executes"
                        } as DBException);
                    }
                    else {
                        resolve();
                    }
                });
        });
    }

    public findOne(id: string, callback: (error: DBException, json: T) => void) {
        var __this = this;
        this.DBManager.DB.collection(this.CollectionName, (error, collection) => {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                let filter: any = {};
                filter[__this.PropertyId] = id;
                collection.findOne(filter, (error, json) => {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, DB.toIdString(json));
                    }
                })
            }
        });
    }
    public findOneAsync(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.findOne(id, (err, json) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(json);
                }
            });
        });
    }

    public findAll(callback: (error: DBException, jsonArray: Array<T>) => void) {
        this.DBManager.DB.collection(this.CollectionName, function (error, collection) {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                collection.find({}, {}).toArray(function (error, models) {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, DB.toIdStringArray(models));
                    }
                });
            }
        });
    }
    public findAllAsync(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.findAll((err, models) => {
                if (err) {
                    reject(new DBException(err));
                }
                else {
                    resolve(models);
                }
            });
        });
    }

    public findByIds(ids: string[], callback: (error: DBException, jsonArray: Array<T>) => void) {
        var __this = this;
        this.DBManager.DB.collection(this.CollectionName, function (error, collection) {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                let find: any = {};
                find[__this.PropertyId] = {
                    "$in": ids
                };
                collection.find(find).toArray(function (error, models) {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, DB.toIdStringArray(models));
                    }
                });
            }
        });
    }
    public findByIdsAsync(ids: string[]): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.findByIds(ids, (err, models) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(models);
                }
            });
        });
    }

    public findByFilter(filter: any, callback: (error: DBException, jsonArray: Array<T>) => void) {
        var __this = this;
        this.DBManager.DB.collection(this.CollectionName, function (error, collection) {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                collection.find(filter).toArray(function (error, models) {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, DB.toIdStringArray(models));
                    }
                });
            }
        });
    }
    public findByFilterAsync(filter: any): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            this.findByFilter(filter, (err, models) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(models);
                }
            });
        });
    }

    public deleteOne(filter: any, callback: (error: DBException, result: DBDeleteResult) => void) {
        var __this = this;
        this.DBManager.DB.collection(this.CollectionName, function (error, collection) {
            if (error) {
                callback(new DBException(error), null);
            }
            else {
                collection.deleteOne(filter, (error, result) => {
                    if (error) {
                        callback(new DBException(error), null);
                    }
                    else {
                        callback(null, new DBDeleteResult(result));
                    }
                });

            }

        });
    }
    public deleteOneAsync(filter: any): Promise<DBDeleteResult> {
        return new Promise<DBDeleteResult>((resolve, reject) => {
            this.deleteOne(filter, (err, models) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(models);
                }
            });
        });
    }
}