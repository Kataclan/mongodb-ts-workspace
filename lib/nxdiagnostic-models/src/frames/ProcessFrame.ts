
export class ProcessFrame {
    processId: number;
    name: string;
    isResponding: boolean;
    mainWindowTitle: string;
    filename: string;
    ram: number;
    ramPeak: number;
    cpuTotal: string;
    cpuUsage: number;
    date: Date;
}