import {Document} from 'mongoose';
import {IDocUsers} from "./Users";
import {tableStatusType} from "../constants";
import {IDocOrders} from "./Orders";


export interface ITables {
    name?: string;
    number: number;
    status:tableStatusType;
    createdBy:IDocUsers["_id"];
    cashier: IDocUsers["_id"];
    orders:IDocOrders["_id"];
    createdDate:Date;
}

//Mongoose modal
export interface IDocTables extends Document, ITables {
}