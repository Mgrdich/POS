import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocUsers} from "../interfaces/models/Users";
import {Roles, ROLES_ALL} from "../roles";

//TODO Reigon creation + telephone number
//TODO citezenship

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
        default: Roles.Admin,
        enum: ROLES_ALL
    },
    rolePriority: {
        type: Number,
        default: 1,
    },
    disabled: {
        type:Boolean
    }
},{timestamps:true});

const Users = mongoose.model<IDocUsers>('Users', userSchema);

export {Users};