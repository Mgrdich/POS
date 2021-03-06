import {Document, Model} from 'mongoose';
import {IDocProducts} from "./Products";
import {ICreatedEditData} from "./General";


export interface IProductsGroups extends ICreatedEditData {
    name: string;
    products: Array<IDocProducts["_id"]>;
}

//Mongoose modal
export interface IDocProductsGroups extends Document, IProductsGroups {
}

export interface IModelProductsGroups extends Model<IDocProductsGroups> {
    //here we declare the statics
    delete: () => void;
    removeProdFrmProdGrp: (_id: IDocProducts["_id"], ProductGroupId: IDocProductsGroups["_id"]) => Promise<any>;
    deleteProductsGroupById: (_id: IDocProductsGroups["_id"]) => Promise<any>;
}