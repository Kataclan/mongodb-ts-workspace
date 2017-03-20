import { ObjectID } from "mongodb";
import { DBManager } from "./DBManager";
import { DBCollection } from "./DBCollection";
import {
    App,
    User,
    FrameLog,
    EventLog,
    Connection

} from "../../lib/core-lib/src";


export class DB {
    public static User: DBCollection<User>;
    public static App: DBCollection<App>;
    public static FrameLog: DBCollection<FrameLog>;
    public static EventLog: DBCollection<EventLog>;
    public static Connection: DBCollection<Connection>;

    public static init(url: string) {
        let manager = new DBManager(url);
        this.User = new DBCollection<User>(manager, "User", "username");
        this.App = new DBCollection<App>(manager, "App", "name");
        this.FrameLog = new DBCollection<FrameLog>(manager, "FrameLog", "_id");
        this.EventLog = new DBCollection<EventLog>(manager, "EventLog", "_id");
        this.Connection = new DBCollection<Connection>(manager, "Connection", "_id");
    }

    public static toIdString(jsonFromDB: any): any {
        if (jsonFromDB == null) {
            return null;
        }
        jsonFromDB._id = (jsonFromDB._id as ObjectID).toString();
        return jsonFromDB;
    }
    public static toIdStringArray<T>(jsonFromDBs: Array<any>): Array<any> {
        if (jsonFromDBs == null) {
            return null;
        }
        jsonFromDBs.forEach(x => {
            DB.toIdString(x);
        });
        return jsonFromDBs;
    }
}