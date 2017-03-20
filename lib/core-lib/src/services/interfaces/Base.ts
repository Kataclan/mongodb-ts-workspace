export interface IResponse {
    responseStatus: IResponseStatus
}

export interface IRequest {
    url: string;
}


export interface IResponseError {
    errorCode: string;
    fieldName: string;
    message: string;
}
export class ResponseError implements IResponseError {
    public errorCode: string;
    public fieldName: string;
    public message: string;
    constructor(errorCode: string, fieldName: string, message: string) {
        this.errorCode = errorCode;
        this.fieldName = fieldName;
        this.message = message;
    }
}
export interface IResponseStatus {
    errorCode: string;
    message: string;
    stackTrace: string;
    errors: Array<IResponseError>
}
export class ResponseStatus implements IResponseStatus {
    public errorCode: string;
    public message: string;
    public stackTrace: string;
    public errors: Array<IResponseError>

    constructor(obj: IResponseStatus) {
        if (obj) {
            this.errorCode = obj.errorCode;
            this.message = obj.message;
            this.stackTrace = obj.stackTrace;
            this.errors = obj.errors;
        }
        else {
            this.errorCode = "-1";
            this.message = "";
            this.stackTrace = null;
            this.errors = [];
        }
    }

    public add(error: IResponseError): ResponseStatus {
        if (!this.errors) {
            this.errors = new Array<IResponseError>();
        }
        this.errors.push(error);
        return this;
    }
}