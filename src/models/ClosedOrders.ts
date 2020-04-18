import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocClosedOrders} from "../interfaces/models/ClosedOrders";

const closedOrderSchema: Schema = new Schema({
    table: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Orders'
    },
    orders: [ //each new order in array means that is added separately
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'OrdersData',
                required: true
            },
            createdBy: { //cashier or creator id
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            waiter: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            }
        }
    ],
    createdBy: { //initial
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    waiter: { //initial
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    orderCreatedAt:{
        type:Date,
        required:true
    },
    price: {
        // required:true,
        type: Number,
        default: 0
    }

},{timestamps:true});

const ClosedOrders = mongoose.model<IDocClosedOrders>('ClosedOrders', closedOrderSchema);

export {ClosedOrders};