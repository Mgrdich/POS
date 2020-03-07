import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const tableSchema: Schema = new Schema({

});

const Tables = mongoose.model('Tables',tableSchema);

export {Tables};