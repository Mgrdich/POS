import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocTables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/contants/arrays";

const tableSchema: Schema = new Schema({
    name: {
        type: String,
    },
    number: {
        type:Number,
        required: true,
    },
    status: {
        type:String,
        enum:TABLE_STATUS
    },
    registeredBy:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Tables = mongoose.model<IDocTables>('Tables',tableSchema);

export {Tables};