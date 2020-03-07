import * as mongoose from 'mongoose';
import {Schema} from "mongoose";

const closedOrderSchema: Schema = new Schema({

});

const ClosedOrders = mongoose.model('ClosedOrders',closedOrderSchema);

export {ClosedOrders};