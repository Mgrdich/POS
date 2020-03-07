import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocSkins} from "../interfaces/models/Skins";

const skinSchema: Schema = new Schema({

});

const Skins = mongoose.model<IDocSkins>('Skins',skinSchema);

export {Skins};