import {Document, Model} from "mongoose";
import {IDocProducts} from "./Products";

export interface IOrdersData {
    data: Array<{
        product: IDocProducts["_id"];
        quantity: number;
    }>,
    price: number;
}

export interface IDocOrdersData extends Document, IOrdersData {
}

export interface IModelOrdersData extends Model<IDocOrdersData> {
    addOrderData: (orders:Array<any>) => Promise<any>;
}