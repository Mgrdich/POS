import {Document, Model} from 'mongoose';
import {ICreatedEditData} from "./General";
import {IDocProductsGroups} from "./ProductsGroups";


export interface IOrders extends ICreatedEditData{
    table:IDocOrders["_id"];
    orders:Array<{
        _id:IDocOrders["_id"],
        modifiedDate:Date
    }>;
}

//Mongoose modal
export interface IDocOrders extends Document, IOrders {
}

export interface IModelProductsGroups extends Model<IDocProductsGroups> {

}