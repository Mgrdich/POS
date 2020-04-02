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
            data: [{ //TODO turn it into a Schema
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Products',
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            }],
            createdBy: { //cashier or creator id
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            waiter: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            price: Number
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
    price: {
        // required:true,
        type: Number,
    }


});

const ClosedOrders = mongoose.model<IDocClosedOrders>('ClosedOrders', closedOrderSchema);

export {ClosedOrders};