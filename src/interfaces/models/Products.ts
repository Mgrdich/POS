import {Document, Model} from 'mongoose';
import {ICreatedEditData} from "./General";


export interface IProducts extends ICreatedEditData {
    name: string;
    price: number;
}

//Mongoose modal
export interface IDocProducts extends IProducts, Document {
    //here we declare the methods
    addProduct: (id:IDocProducts["_id"]) => Promise<any>;
}

export interface IModelProducts extends Model<IDocProducts> {
    //here we declare the statics
    sss: () => void;
}