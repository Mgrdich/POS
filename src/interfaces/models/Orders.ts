import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";


export interface IOrders{
    table:IDocOrders["_id"];
    orders:Array<any>;
    waiter:IDocUsers["_id"];
    createdDate:Date;
    createdBy:IDocUsers["_id"];
}

//Mongoose modal
export interface IDocOrders extends Document, IOrders {
}

export interface IModelOrdersData extends Model<IDocOrders> {

}