import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocGroupsChat, IModelGroupsChat} from "../interfaces/models/ChatGroups";
import {IDocUsers} from "../interfaces/models/Users";
import {IDocMessage} from "../interfaces/models/Message";
import {Messages} from "./Message";

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
    modifiedBy: [ //TODO transformed into another document
        {
            _id: { //user id
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type: Date,
            }
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

chatGroupsSchema.methods.add = async function (sender: IDocUsers["id"], message: string): Promise<any> {
    const {_id: messageId}: IDocMessage = await Messages.add(sender, message);
    this.messages.push(messageId);
    return this.save();
};


const GroupsChats: IModelGroupsChat = mongoose.model<IDocGroupsChat, IModelGroupsChat>('GroupsChats', chatGroupsSchema);

export {GroupsChats};