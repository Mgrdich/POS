import {Document, Model} from 'mongoose';
import {ICreatedEditData} from "./General";
import {IDocProductsGroups} from "./ProductsGroups";
import {IDocUsers} from "./Users";


export interface IOrders extends ICreatedEditData{
    table:IDocOrders["_id"];
    orders:Array<{
        _id:IDocOrders["_id"],
        modifiedDate:Date
    }>;
    waiter:IDocUsers["_id"];
}

//Mongoose modal
export interface IDocOrders extends Document, IOrders {
}

export interface IModelProductsGroups extends Model<IDocProductsGroups> {

}