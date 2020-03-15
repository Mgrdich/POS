import {Document} from 'mongoose';
import {ICreatedEditData} from "./General";


export interface IProducts extends ICreatedEditData {
    name:string;
    price:number;
}

//Mongoose modal
export interface IDocProducts extends Document, IProducts {
}