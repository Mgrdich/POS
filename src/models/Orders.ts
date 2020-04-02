import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocOrders, IModelOrders} from "../interfaces/models/Orders";
import {sameObjectId} from "../utilities/functions";
import {OrdersData} from "./OrderData";
import {IDocUsers} from "../interfaces/models/Users";

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
    price: {
        // required:true,
        type: Number,
    }

}, {timestamps: true});


orderSchema.methods.editOrder = async function (user:IDocUsers["_id"], waiter:IDocUsers["_id"], orders): Promise<any> {
    let isSameWaiter: boolean = sameObjectId(this.waiter, waiter);
    let isSameCashier: boolean = sameObjectId(this.createdBy, user);

    let orderData = await OrdersData.addOrderData(orders);
    if (!isSameWaiter || isSameCashier) {
        this.orders.push({
            _id: orderData._id,
            createdBy: user,
            waiter: waiter,
            createdDate: new Date()
        })
    } else {
        this.orders.push({
            _id: orderData._id,
        })
    }
    return this.save();
};


//TODO here should be used virtuals so that the populate name can be renamed
orderSchema.statics.deleteOrderById = async function (id):Promise<any> {
    const toBeDeletedOrder:IDocOrders = await Orders.findById(id).populate('orders._id');
    console.log(toBeDeletedOrder);

};

orderSchema.statics.closeOrderById = async function (id):Promise<any> {
    //delete should be called here
};

const Orders: IModelOrders = mongoose.model<IDocOrders, IModelOrders>('Orders', orderSchema);

export {Orders};