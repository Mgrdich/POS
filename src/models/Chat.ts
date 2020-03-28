import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocChat, IModelChat} from "../interfaces/models/Chat";

const chatSchema = new Schema({
    messages: [
        { //message id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }
    ],
    participants: [{
        type: mongoose.Schema.Types.ObjectId, //in this case 2
        ref: 'Users'
    }],
}, {timestamps: true});

const Chats: IModelChat = mongoose.model<IDocChat, IModelChat>('Chats', chatSchema);

export {Chats};

