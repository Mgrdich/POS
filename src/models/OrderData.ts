import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrdersData, IModelOrdersData} from "../interfaces/models/OrderData";

//TODO check out whether an api is needed for it
const orderDataSchema: Schema = new Schema({
    data: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],
    price: {
        type:Number,
        required:true
    }
});

orderDataSchema.statics.addOrderData = async function (orders:Array<any>):Promise<any> {
    const newOrderData = new this();
    newOrderData.data.push(...orders);
    console.log(orders);
    let price:number = orders.reduce(function (acc,curr) {

    },0)
};

const OrdersData:IModelOrdersData = mongoose.model<IDocOrdersData,IModelOrdersData>('OrdersData', orderDataSchema);

export {OrdersData};