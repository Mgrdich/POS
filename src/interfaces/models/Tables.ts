import {Document} from 'mongoose';
import {IDocUsers} from "./Users";
import {tableStatusType} from "../constants";
import {IDocOrders} from "./Orders";


export interface ITables {
    name?: string,
    number: number,
    status:tableStatusType,
    registeredBy:IDocUsers["_id"],
    cashier: IDocUsers["_id"],
    orders:IDocOrders["_id"],
}

//Mongoose modal
export interface IDocTables extends Document, ITables {
}