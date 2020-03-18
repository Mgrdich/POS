import {Document, Model} from 'mongoose';
import {ICreatedEditData} from "./General";
import {IDocProductsGroups} from "./ProductsGroups";


export interface IProducts extends ICreatedEditData {
    name: string;
    price: number;
    group:IDocProductsGroups["_id"];
}

//Mongoose modal
export interface IDocProducts extends IProducts, Document {
    //here we declare the methods
    addProduct: (id: IDocProducts["_id"]) => Promise<any>;
    deleteProductById: () => Promise<any>;
}

export interface IModelProducts extends Model<IDocProducts> {
    //here we declare the statics
}