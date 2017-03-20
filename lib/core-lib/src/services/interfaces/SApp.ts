import { App } from "../../models/apps/App";
import { IRequest, IResponse, IResponseStatus, } from "./Base";

export module SApp {

    export class FindAllRequest implements IRequest {
        public url: string;
        constructor() {
            this.url = "/sapp/findAll";
        }
    }
    export interface FindAllResponse extends IResponse {
        apps: App[];
        responseStatus: IResponseStatus
    }

    export class UpdateVersionRequest implements IRequest {
        public url: string;
        public appName: string;
        public appType: string;
        public version: string;
        constructor(appName: string, appType: string, version: string) {
            this.url = "/sapp/updateVersion";
            this.appName = appName;
            this.appType = appType;
            this.version = version;
        }
    }
    export interface UpdateVersionResponse extends IResponse {
    }

    export class FindByNameRequest implements IRequest {
        public url: string;
        public appName: string;
        constructor(appName: string) {
            this.url = "/sapp/findByName";
            this.appName = appName;
        }
    }
    export interface FindByNameResponse extends IResponse {
        app: App;
        responseStatus: IResponseStatus;
    }

    export class FindByNamesRequest implements IRequest {
        public url: string;
        public appNames: string[];
        constructor(appNames: string[]) {
            this.url = "/sapp/findByNames";
            this.appNames = appNames;
        }
    }
    export interface FindByNamesResponse extends IResponse {
        apps: App[];
        notFound: string[];
    }

    export class InsertOneRequest implements IRequest {
        public url: string;
        public app: App
        constructor(app: App) {
            this.url = "/sapp/insertOne";
            this.app = app;
        }
    }
    export interface InsertOneResponse extends IResponse {
        app: App
    }
}