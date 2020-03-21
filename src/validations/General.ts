import {param} from "express-validator";
import * as mongoose from "mongoose";

export const paramIdValidation:Array<any> = [
    param('id')
        .custom(function(value) {
            return mongoose.Types.ObjectId.isValid(value);
        })
];