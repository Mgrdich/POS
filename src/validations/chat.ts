import {param} from "express-validator";
import {sameObjectId} from "../utilities/functions";
import * as mongoose from "mongoose";


export const getChatByUidValidation: Array<any> = [
    param('id').custom( function (value, {req}) {
        if (sameObjectId(value, req.user._id)) {
            return Promise.reject('same user');
        }
        return mongoose.Types.ObjectId.isValid(value);
    })
];