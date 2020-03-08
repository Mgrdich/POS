import {Request} from "express";
import {IDocUsers, IUser} from "./models/Users";

export interface IError {
    value: string | number;
    msg: string;
    param: string;
    location: string;
    nestedErrors?:Array<any>;
}

export interface ImyError extends Error {
    statusCode: number;
    message: string;
    data: any;
}

export interface IDropDowns {
    value: number | string;
    placeholder: string;
    id?: string;
}

export interface myRequest extends Request {
    user :IDocUsers;
}
