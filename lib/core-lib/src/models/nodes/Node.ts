import { Model } from "../Model"
import { GeoLocation } from "../../types/Geo";
import { Exception } from "../../types/Exceptions"
import { AppSettings } from "../apps/App";
import { HardwareDescriptor, SoftwareDescriptor } from "./descriptors/Descriptors";

export interface NodeSettings {
    ip: string;
    wifiSSID: string;
    wifiPassword: string;
}

export interface Node extends Model {
    owner_uid: string;
    settings: NodeSettings
    uid: string;
    appNames: string[];
    appsSettings: AppSettings[];
    geoLocation: GeoLocation;
    hardware: HardwareDescriptor;
    softwares: SoftwareDescriptor[];
}

export class NodeEx {
    public static containsSettings(node: Node, appName: string): Boolean {
        for (let i = 0; i < node.appsSettings.length; i++) {
            if (node.appsSettings[i].appName == appName) {
                return true;
            }
        }
        return false;
    }
    public static getSettings(node: Node, appName: string): AppSettings {
        for (let i = 0; i < node.appsSettings.length; i++) {
            if (node.appsSettings[i].appName == appName) {
                return node.appsSettings[i];
            }
        }
        throw new Exception(`app settings "${appName}" not found`)
    }
}