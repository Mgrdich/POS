import {Document} from 'mongoose';
import {IDocUsers} from "./Users";
import {IDocOrders} from "./Orders";
import {IDocOrdersData} from "./OrderData";


export interface IClosedOrders {
    table: IDocOrders["_id"];
    orders: Array<{
        _id: IDocOrdersData["_id"],
        createdBy: IDocUsers["_id"],
        waiter: IDocUsers["_id"],
        createdDate: Date
    }>;
    waiter: IDocUsers["_id"];
    createdBy: IDocUsers["_id"];
    price:number;
}

//Mongoose modal
export interface IDocClosedOrders extends Document, IClosedOrders {
}