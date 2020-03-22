import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrders} from "../interfaces/models/Orders";

const orderSchema: Schema = new Schema({
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
                },
                createdBy: { //cashier or creator id
                    type: Schema.Types.ObjectId,
                    ref: 'Users',
                },
                waiter: {
                    type: Schema.Types.ObjectId,
                    ref: 'Users',
                },
                createdDate: {
                    type: Date,
                }
            }
        ],
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    waiter: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    price: {
        // required:true,
        type: Number,
    }

});


orderSchema.methods.editOrder = function (user, waiter) {
    let isSameWaiter: boolean = this.waiter === waiter;
    let isSameCashier: boolean = this.createdBy === user._id;
    if (!isSameWaiter || isSameCashier) { //if either one of them changes so data about it should be stored

    }
};

const Orders = mongoose.model<IDocOrders>('Orders', orderSchema);

export {Orders};