import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const orderSchema: Schema = new Schema({

});

const Orders = mongoose.model('Orders',orderSchema);

export {Orders};