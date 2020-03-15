import {Document} from 'mongoose';
import {IDocProducts} from "./Products";
import {ICreatedEditData} from "./General";


export interface IProductsGroups extends ICreatedEditData {
    name: string;
    products:Array<IDocProducts["_id"]>;
}

//Mongoose modal
export interface IDocProductsGroups extends Document, IProductsGroups {
}