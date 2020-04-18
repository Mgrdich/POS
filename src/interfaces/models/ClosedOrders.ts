import {Document} from 'mongoose';
import {IDocOrders} from "./Orders";


export interface IClosedOrders extends IDocOrders{
    orderCreatedAt:Date
}

//Mongoose modal
export interface IDocClosedOrders extends Document, IClosedOrders {
}