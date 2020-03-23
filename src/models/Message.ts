import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const messageSchema = new Schema({
    message: {
        type:String,
        required:true
    },
    //later should be add seen by etc
},{timestamps:true});