// from global
import * as mongodb from 'mongodb';
import * as path from 'path';
import * as fs from 'fs';

// From lib
import { User, App } from "../../lib/core-lib/src";

// From Local
import { IConfig } from './IConfig';
import { DBManager } from "../db/DBManager";
import { DB } from "../db/DB";

class G {
    Config: IConfig;
    WwwRoot: string;
    constructor() {
        this.init();
    }

    public init() {
        this.loadConfigFile();
        this.getWwwRoot();
    }

    // STARTUP METHODS ()
    private loadConfigFile() {
        let file = './dist/debug/res/config.json'
        console.log(`start loading ${file} file...`);
        var configFilePath = path.resolve(file);
        this.Config = JSON.parse(fs.readFileSync(configFilePath, 'utf8')) as IConfig;
        console.log(`...end`);
    }
    private getWwwRoot() {
        this.WwwRoot = path.resolve(this.Config.wwwroot);
        console.log(`www = ${this.WwwRoot}`);
    }
}

export default new G();