export class Exception {
    public message: string;
    constructor(message: string) {
        this.message = message;
    }
}
export class FormatException extends Exception {
    constructor(message: string) {
        super(message);
    }
}