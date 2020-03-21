import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrders} from "../interfaces/models/Orders";

const orderSchema: Schema = new Schema({
    table: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Orders'
    },
    orders:[{
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        modifiedDate: {
            type: Date,
        },
        quantity: {
            type:Number,
            default: 1
        }
    }],
    modifiedBy: [ //how many times after the initial order it does get change
        {
            _id: { //cashier or creator id
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            waiter :{
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type: Date,
            }
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    price: {
        // required:true,
        type:Number,
    }

});

const Orders = mongoose.model<IDocOrders>('Orders', orderSchema);

export {Orders};