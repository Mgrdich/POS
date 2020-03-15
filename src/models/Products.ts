import * as mongoose from 'mongoose';
import {Model, Schema} from "mongoose";
import {IDocProducts, IModelProducts, IProducts} from "../interfaces/models/Products";

const productSchema: Schema<IDocProducts> = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'ProductsGroup'
    },
    createdBy: { //TODO created edit properties should be refactored
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    modifiedBy: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type: Date,
            }
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    },
});

productSchema.methods.addProduct = function ():void {

};

productSchema.statics.sss = function () {

};

const Products:IModelProducts = mongoose.model<IDocProducts,IModelProducts>('Products', productSchema);

export {Products};