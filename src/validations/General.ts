import {param} from "express-validator";
import * as mongoose from "mongoose";

export const paramIdValidation:Array<any> = [
    param('id')
        .custom(function(value, {req}) {
            return mongoose.Types.ObjectId.isValid(value);
        })
];