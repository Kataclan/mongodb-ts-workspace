import { User } from "../../models/users/User";
import { App } from "../../models/apps/App";
import { IRequest, IResponse, IResponseStatus } from "./Base";

// [ sauth ]
export module SAuth {
    export class RegisterRequest implements IRequest {
        public url: string;
        public mail: string;
        public firstname: string;
        public lastname: string;
        constructor(mail: string, firstname: string, lastname: string) {
            this.url = "/sauth/register";
            this.mail = mail;
            this.firstname = firstname;
            this.lastname = lastname;
        }
    }
    export interface RegisterResponse extends IResponse {
        user: User;
        apps: App[];
    }

    export class LoginRequest implements IRequest {
        public url: string;
        public mail: string;
        constructor(mail: string) {
            this.url = "/sauth/login";
            this.mail = mail;
        }
    }
    export interface LoginResponse extends IResponse {
        user: User;
        apps: App[];
    }

    export class LogoutRequest implements IRequest {
        public url: string;
        public mail: string;
        constructor(mail: string) {
            this.url = "/sauth/logout";
            this.mail = mail;
        }
    }
    export interface LogoutResponse extends IResponse {
    }
}