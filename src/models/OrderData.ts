import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrdersData, IModelOrdersData} from "../interfaces/models/OrderData";

//TODO check out whether an api is needed for it
const orderDataSchema: Schema = new Schema({
    data: [{ //could be turned into Schema
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

    },
},{timestamps: true});

orderDataSchema.statics.addOrderData = async function (orders:Array<any>):Promise<any> {
    const newOrderData = new this();
    newOrderData.data.push(...orders);
    await newOrderData.save(); //TODO other ways to populate without save
    let orderData:IDocOrdersData = await this.findById(newOrderData._id).populate('data.product', 'price');
    orderData.price  = orderData.data.reduce(function (sum,curr) {
        let itemAccumulatedPrice = curr.quantity * curr.product.price;
        return (sum + itemAccumulatedPrice)
    },0);
    return orderData.save();
};

const OrdersData:IModelOrdersData = mongoose.model<IDocOrdersData,IModelOrdersData>('OrdersData', orderDataSchema);

export {OrdersData};