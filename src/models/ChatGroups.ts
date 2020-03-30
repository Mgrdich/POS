import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocGroupsChat, IModelGroupsChat} from "../interfaces/models/ChatGroups";

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

const GroupsChats: IModelGroupsChat = mongoose.model<IDocGroupsChat, IModelGroupsChat>('GroupsChats', chatGroupsSchema);

export {GroupsChats};