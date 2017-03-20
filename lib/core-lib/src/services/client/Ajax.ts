import * as $ from 'jquery';

export interface IAjaxSuccess {
    data: any;
    textStatus: string;
    jqXHR: JQueryXHR;
}
export interface IAjaxError {
    jqXHR: JQueryXHR;
    textStatus: string;
    errorThrow: string;
}

export class AjaxEx {
    public static isError(json: any) {
        var obj = json as IAjaxError;
        return obj.jqXHR && obj.textStatus && obj.errorThrow;
    }
}

export class Ajax {
    //#region [ Public Methods ]
    public static getJson(
        url: string,
        data: any,
        success: (data: any, textStatus: string, jqXHR: JQueryXHR) => void,
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => void) {

        return $.ajax({
            url: url,
            type: "GET",
            data: data,
            dataType: 'json',
            success: success,
            error: error
        });
    }
    public static getJsonAsync<T>(url: string, data: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            $.ajax({
                url: url,
                type: "GET",
                data: data,
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    resolve(data as T);
                },
                error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                    reject({
                        jqXHR: jqXHR,
                        textStatus: textStatus,
                        errorThrow: errorThrow
                    } as IAjaxError)
                }
            });
        });
    }

    public static postJSON(
        url: string,
        data: any,
        success: (data: any, textStatus: string, jqXHR: JQueryXHR) => void,
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => void) {

        return $.ajax({
            url: url,
            type: "POST",
            data: data,
            dataType: 'json',
            success: success,
            error: error
        });
    }
    public static postJsonAsync<T>(url: string, data: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            $.ajax({
                url: url,
                type: "POST",
                data: data,
                dataType: 'json',
                success: (data, textStatus, jqXHR) => {
                    resolve(data as T);
                },
                error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                    reject({
                        jqXHR: jqXHR,
                        textStatus: textStatus,
                        errorThrow: errorThrow
                    } as IAjaxError)
                }
            });
        });
    }
    //#endregion
};