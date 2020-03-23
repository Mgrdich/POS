import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const ChatSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    messages: [
        {
            message: String,
            meta: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Users'
                    },
                    delivered: Boolean,
                    read: Boolean
                }
            ]
        }
    ],
    is_group_message: {type: Boolean, default: false},
    participants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
            delivered: Boolean,
            read: Boolean,
            last_seen: Date
        }
    ]
});