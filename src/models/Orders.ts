import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrders, IModelOrders} from "../interfaces/models/Orders";

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
                    required:true
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


orderSchema.methods.editOrder = async function (user, waiter,orders):Promise<any> {
    let isSameWaiter: boolean = this.waiter === waiter;
    let isSameCashier: boolean = this.createdBy === user._id;

};

const Orders:IModelOrders = mongoose.model<IDocOrders,IModelOrders>('Orders', orderSchema);

export {Orders};