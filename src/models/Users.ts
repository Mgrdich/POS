import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocUser} from "../interfaces/models/Users";
import {ROLES} from "../utilities/constants";

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        enum: [...ROLES]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Users = mongoose.model<IDocUser>('Users', userSchema);

export {Users};