import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrdersData} from "../interfaces/models/OrderData";

//TODO check out whether an api is needed for it
const orderDataSchema: Schema = new Schema({
    data: {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        },
        quantity: {
            type: Number,
            default: 1
        },
    },
    price: {
        type:Number,
        required:true
    }
});

orderDataSchema.methods.addOrderData = function ()/*:Promise<any>*/ {

};

const OrdersData = mongoose.model<IDocOrdersData>('OrdersData', orderDataSchema);

export {OrdersData};