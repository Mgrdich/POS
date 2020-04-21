import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";
import {tableStatusType} from "../constants";
import {IDocOrders} from "./Orders";
import {IDocProducts} from "./Products";
import {IDocProductsGroups} from "./ProductsGroups";
import {TableStatus} from "../../utilities/constants/enums";


export interface ITables {
    name?: string;
    number: number;
    status:tableStatusType;
    createdBy:IDocUsers["_id"];
    cashier: IDocUsers["_id"];
    orders:IDocOrders["_id"];
    modifiedBy:Array<{
        _id:IDocUsers["_id"],
        modifiedDate:Date,
    }>;
}

//Mongoose modal
export interface IDocTables extends Document, ITables {
}

export interface IModelTables extends Model<IDocTables> {
    //here we declare the statics
    changeTableStatus: (_id: IDocTables["_id"],status:TableStatus) => Promise<any>;
}