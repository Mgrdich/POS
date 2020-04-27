import {Request} from "express";
import {IDocUsers} from "./models/Users";

export interface IDelete { //TODO remove to a general mongoose based
    n?:number;
    ok?:number;
    deletedCount?:number;
}

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

export interface ITimestamps {
    createdAt:Date;
    updatedAt:Date;
}

export interface IRange {
    gt:Date,
    lt:Date
}
