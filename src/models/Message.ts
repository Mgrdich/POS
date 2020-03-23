import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const messageSchema = new Schema({
    message: {
        type:String,
        required:true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
    //later should be add seen by etc
},{timestamps:true});