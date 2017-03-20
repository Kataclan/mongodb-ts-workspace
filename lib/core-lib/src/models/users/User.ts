import { Model } from "../Model";
import { App, AppSettings } from "../apps/App";
import { Exception } from "../../types/Exceptions"

export class UserRoles {
    public static readonly User: string = "user";
    public static readonly Admin: string = "admin";
    public static readonly Support: string = "support";
}

export interface User extends Model {
    username: string;
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    appNames: string[];
    appsSettings: Array<AppSettings>;
    roles: string[];
    isFirstTime: boolean;
    buildMode: string;
}

export class UserEx {

    public static updateSetting(user: User, settings: AppSettings) {
        var newSettings = settings;
        if (UserEx.containsSettings(user, settings.appName)) {
            UserEx.removeSettings(user, settings.appName);
        }
        user.appsSettings.push(settings);
    }
    public static containsSettings(user: User, appName: string): Boolean {
        for (let i = 0; i < user.appsSettings.length; i++) {
            if (user.appsSettings[i].appName == appName) {
                return true;
            }
        }
        return false;
    }
    public static getSettings(user: User, appName: string): AppSettings {
        for (let i = 0; i < user.appsSettings.length; i++) {
            if (user.appsSettings[i].appName == appName) {
                return user.appsSettings[i];
            }
        }
        throw new Exception(`app settings "${appName}" not found`)
    }
    private static removeSettings(user: User, appName: string) {
        if (!UserEx.containsSettings(user, appName)) {
            throw new Exception(`AppSettings ${appName} not found`);
        }
        let idx = user.appsSettings.findIndex((settings: AppSettings) => {
            return settings.appName === appName;
        });
        user.appsSettings.splice(idx, 1);
    }
}