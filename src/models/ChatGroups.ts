import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const chatGroupsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: { //initial
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    admins: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        }
    }],
    members: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        }
    }]
}, {timestamps: true});