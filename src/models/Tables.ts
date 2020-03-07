import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const tableSchema: Schema = new Schema({
    name: {
        type: String,
    },
    number: {
        type:Number,
        required: true,
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

const Tables = mongoose.model('Tables',tableSchema);

export {Tables};