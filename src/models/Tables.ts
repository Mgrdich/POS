import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocTables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/contants/arrays";
import {TableStatus} from "../utilities/contants/enums";

const tableSchema: Schema = new Schema({
    name: {
        type: String,
    },
    number: {
        type:Number,
        required: true,
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: 'Orders'
    },
    status: {
        type:String,
        enum:TABLE_STATUS,
        default:TableStatus.closed
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

//TODO functions to write resetting orders status registeredBy and cashier

export {Tables};