import * as mongodb from 'mongodb';
export class DBInsertResult {
    public n: number;
    public ok: number;
    constructor(result: mongodb.InsertOneWriteOpResult) {
        this.n = result.result.n;
        this.ok = result.result.ok;
    }
}
export class DBUpdateResult {
    public n: number;
    public ok: number;
    public nModified: number;
    constructor(result: mongodb.UpdateWriteOpResult) {
        this.n = result.result.n;
        this.ok = result.result.ok;
        this.nModified = result.result.nModified;
    }
}

export class DBDeleteResult {
    public n: number;
    public ok: number;
    public deleteCount: number;
    constructor(result: mongodb.DeleteWriteOpResultObject) {
        this.n = result.result.n;
        this.ok = result.result.ok;
        this.deleteCount = result.deletedCount;
    }
}