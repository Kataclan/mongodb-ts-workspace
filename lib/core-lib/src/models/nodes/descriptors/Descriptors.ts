export interface ComputerDescriptor {
    motherboard: string;
    cpu: string;
    cooler: string;
    hd: string;
    power: string;
    ram: string[];
    pciCards: string[];
}
export interface AudioDescriptor {
    speakers: string[];
    amp: string;
}
export class DisplayType {
    public static readonly Projector = "projector";
    public static readonly Monitor = "monitor";
}
export interface HardwareDescriptor {
    computer: ComputerDescriptor;
    fans: string[];
    usbDevices: string[];
    hdmiDevices: string[];
    displayType: string;
    display: string;
    audio: AudioDescriptor;
    ethernet: string;
    box: string;
}

export class SoftwareDescriptor {
    name: string;
    licence: string;
    comment: string;
}

