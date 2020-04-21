import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocChat, IModelChat} from "../interfaces/models/Chat";
import {IDocUsers} from "../interfaces/models/Users";
import {Messages} from "./Message";
import {IDocMessage} from "../interfaces/models/Message";


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


chatSchema.statics.add = async function (sender: IDocUsers["id"], receiver: IDocUsers["_id"], message: string): Promise<any> {
    try {
        const {_id: messageId}: IDocMessage = await Messages.add(sender, message);
        let chat: IDocChat;
        try {
            chat = await this.findOne({participants: {$all: [sender, receiver]}});
        } catch (e) {
            console.log(e);
        }

        if (chat) {
            chat.messages.push(messageId);
            return chat.save();
        }

        const newChat: IDocChat = new this();
        newChat.messages = [messageId];
        newChat.participants = [sender, receiver];
        return newChat.save();
    } catch (e) {
        console.log(e);
    }
};


const Chats: IModelChat = mongoose.model<IDocChat, IModelChat>('Chats', chatSchema);

export {Chats};

