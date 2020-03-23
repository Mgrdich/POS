import {Document} from 'mongoose';
import {IDocProducts} from "./Products";
import {IDocUsers} from "./Users";
import {IDocOrders} from "./Orders";


export interface IClosedOrders {
    table: IDocOrders["_id"];
    orders: Array<{
        data: Array<{
            product: IDocProducts["_id"];
            quantity: number;
        }>,
        createdBy: IDocUsers["_id"],
        waiter: IDocUsers["_id"],
        createdDate: Date,
        price:number
    }>;
    waiter: IDocUsers["_id"];
    createdBy: IDocUsers["_id"];
    price:number;
}

//Mongoose modal
export interface IDocClosedOrders extends Document, IClosedOrders {
}