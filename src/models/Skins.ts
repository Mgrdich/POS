import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const skinSchema: Schema = new Schema({

});

const Skins = mongoose.model('Skins',skinSchema);

export {Skins};