
export class PJLinkPowerStatus {
    public static readonly Warmup = "warmup";
    public static readonly Cooling = "cooling";
    public static readonly On = "on";
    public static readonly Off = "off";
    public static readonly Unknow = "unknow";
}
export class PJLinkLampStatus {
    public static readonly On = "on";
    public static readonly Off = "off";
}
export interface PJLinkInfo {
    name: string;
    info: string;
    info1: string;
    info2: string;
}
export interface PJLinkLamp {
    hours: number;
    status: string;
}
export interface PJLinkFrame {
    lamps: PJLinkLamp;
    power: string;
    info: PJLinkInfo;
    errors: string[];
}

