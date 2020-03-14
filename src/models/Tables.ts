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
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    createdDate:{
      type:Date,
      default:Date.now
    },
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Tables = mongoose.model<IDocTables>('Tables',tableSchema);

//TODO functions to write resetting orders status registeredBy and cashier

export {Tables};