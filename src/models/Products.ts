import * as mongoose from 'mongoose';
import {Model, Schema} from "mongoose";
import {IDocProducts, IModelProducts, IProducts} from "../interfaces/models/Products";
import {ProductsGroups} from "./ProductsGroups";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";

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

productSchema.methods.addProduct = function (productGroupId): Promise<any> {
    let productGroupQ: Promise<any> = ProductsGroups.findById(productGroupId)
        .then(function (productGroup: IDocProductsGroups) {
            productGroup.products.push({_id: this._id});
            return productGroup.save();
        });
    let productQ: Promise<any> = this.save();

    return Promise.all([productQ, productGroupQ]);
};

productSchema.statics.sss = function () {

};

const Products: IModelProducts = mongoose.model<IDocProducts, IModelProducts>('Products', productSchema);

export {Products};