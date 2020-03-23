import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";
import {IDocOrdersData} from "./OrderData";


export interface IOrders {
    table: IDocOrders["_id"];
    orders: Array<{
        _id: IDocOrdersData["_id"],
        createdBy: IDocUsers["_id"],
        waiter: IDocUsers["_id"],
        createdDate: Date
    }>;
    waiter: IDocUsers["_id"];
    createdBy: IDocUsers["_id"];
}

//Mongoose modal
export interface IDocOrders extends Document, IOrders {
    editOrder: (user: IDocUsers["_id"], waiter: IDocUsers["_id"], orders: any) => Promise<any>;
}

export interface IModelOrders extends Model<IDocOrders> {
    deleteOrderById: (id: string) => Promise<any>;
}