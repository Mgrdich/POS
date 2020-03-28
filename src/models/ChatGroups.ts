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
    messages: [
        { //message id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }
    ],
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }]
}, {timestamps: true});