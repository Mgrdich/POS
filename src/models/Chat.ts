import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const chatSchema = new Schema({
    messages: [
        {
            _id: { //message id
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Messages'
            }
        }
    ],
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    participantGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});