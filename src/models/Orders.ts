import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrders} from "../interfaces/models/Orders";

const orderSchema: Schema = new Schema({

});

const Orders = mongoose.model<IDocOrders>('Orders',orderSchema);

export {Orders};