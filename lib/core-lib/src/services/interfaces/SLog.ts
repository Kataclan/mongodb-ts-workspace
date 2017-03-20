import { FrameLog } from "../../models/logs/FrameLog"
import { EventLog } from "../../models/logs/EventLog"
import { IRequest, IResponse, IResponseStatus } from "./Base";

export module SLog {
    export class SetFrameLogRequest implements IRequest {
        url: string;
        public log: FrameLog;
        constructor(log: FrameLog) {
            this.url = "/slog/setFrameLog";
            this.log = log;
        }
    }
    export interface SetFrameLogResponse extends IResponse {
        log: FrameLog;
    }
    export class SetEventLogRequest implements IRequest {
        url: string;
        public log: EventLog;
        constructor(log: EventLog) {
            this.url = "/slog/setEventLog";
            this.log = log;
        }
    }
    export interface SetEventLogResponse extends IResponse {
        log: EventLog;
    }
}