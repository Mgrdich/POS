import {param, query} from "express-validator";
import * as mongoose from "mongoose";
import {DateRanges} from "../utilities/constants/enums";

export const paramIdValidation: Array<any> = [
    param('id')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        })
];

export const queryDateValidation: Array<any> = [
    query('date')
        .custom(function (value, {req}) {
            if (value === undefined) {
                req.query.date = DateRanges.ytd; //when it is not defined
                return true;
            }
            return !!DateRanges[value];
        })
];