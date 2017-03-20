export interface ComputerFrame {
    hardwares: HardwareFrame[]
    flags: ComputerFlags
}
export interface ComputerFlags {
    cpuEnabled: boolean;
    gpuEnabled: boolean;
    fanControllerEnabled: boolean;
    hddEnabled: boolean;
    mainboardEnabled: boolean;
    ramEnabled: boolean;
}
export interface HardwareFrame {
    hardwareType: string;
    identifier: string;
    name: string;
    subHardwares: HardwareFrame[];
    sensors: SensorFrame[];
}
export interface SensorValueFrame {
    name: string;
    min: number;
    vax: number;
    Value: number;
}

export interface SensorFrame {
    SensorType: string;
    Name: string;
    Identifier: string;
    Index: number;
    IsDefaultHidden: boolean;
    Value: SensorValueFrame;
}
