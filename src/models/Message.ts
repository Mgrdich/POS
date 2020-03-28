import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocMessage, IModelMessage} from "../interfaces/models/Message";
import {IDocUsers} from "../interfaces/models/Users";

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
    //later should be add seen by etc
}, {timestamps: true});


messageSchema.statics.addMessage = function (message: string, userId: IDocUsers["_id"]) {
    let newMessage: IDocMessage = new this({message: message, sender: userId});
    return newMessage.save();
};

const Messages: IModelMessage = mongoose.model<IDocMessage, IModelMessage>('Messages', messageSchema);

export {Messages};