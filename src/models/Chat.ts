import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const chatSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    messages: [
        {
            _id: { //message id
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Messages'
            }
        }
    ],
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    participantGroup:{

    }
});