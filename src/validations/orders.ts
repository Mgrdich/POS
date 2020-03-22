import * as mongoose from "mongoose";
import {body} from "express-validator"
import {paramIdValidation} from "./General";

export const addOrderValidation: Array<any> = [
    body('table')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        }),
    body('waiter')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        }),
];

export const editOrderValidation: Array<any> = [
    body('waiter')
        .custom(function (value) {
            return mongoose.Types.ObjectId.isValid(value);
        }),
    body('orders')
        .custom(function (value) {
            return value.every(function (item: string) {
                return mongoose.Types.ObjectId.isValid(value)
            })
        }),
    ...paramIdValidation
];