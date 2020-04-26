import {NextFunction, Request} from "express";
import {validationResult} from "express-validator";

export const errorThrower = function (errMessage: string, statusCode: number, data?: any) {
    const error = new Error(errMessage);
    error["statusCode"] = statusCode;
    error["data"] = data;
    throw error;
};

export const errorCatcher = function (next: NextFunction, err: Error) {
    if (!err["statusCode"]) {
        err["statusCode"] = 500;
    }
    next(err);
};

export const errorFormatter = function ({location, msg, param, value, nestedErrors}) { //change this later
    return `${msg}`;
};

export const errorValidation = function (req:Request) {
    const errors: any = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        errorThrower("Validation Failed", 422, errors.mapped());
    }
};