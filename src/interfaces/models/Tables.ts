import {Document, Schema} from 'mongoose';
import {IDocUsers} from "./Users";


export interface ITables {
    name?: string,
    number: number,
    registeredBy:IDocUsers["_id"],
    cashier: IDocUsers["_id"],
}

//Mongoose modal
export interface IDocTables extends Document, ITables {
}