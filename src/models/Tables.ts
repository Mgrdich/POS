import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocTables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/constants/arrays";
import {TableStatus} from "../utilities/constants/enums";

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
    },
    modifiedBy:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type:Date,
            }
        }
    ],
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
},{timestamps:true});

const Tables = mongoose.model<IDocTables>('Tables',tableSchema);

//TODO functions to write resetting orders status and cashier

export {Tables};