import { Model } from "../Model";
import { Version } from "../../types/Version";
import { Exception } from "../../types/Exceptions";
import { AppTypes } from "../../types/AppTypes";
import { BuildModes } from "../../types/BuildModes";


export interface AppSettings {
    appName: string;
    isFirstTime: boolean;
    settings: any;
}

export interface App extends Model {
    name: string;
    nameToShow: string;
    description: string;
    versionMob: string;
    versionNod: string;
    defaultUserSettings: AppSettings;
    defaultNodeSettings: AppSettings;
}

export class AppEx {
    public static getFilename(app: App, type: string): string {
        return `${app.name}_${app.versionMob}_${type}.zip`;
    }
    public static getUrl(app: App, type: string, buildMode: string): String {
        return `http://nodwall.nexcode.io/${buildMode}/apps/${AppEx.getFilename(app, type)}`;
    }
}