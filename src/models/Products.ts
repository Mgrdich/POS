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
    let _id = this._id;
    let productGroupQ: Promise<any>;
    if (productGroupId) {
        productGroupQ = ProductsGroups.findById(productGroupId)
            .then((productGroup: IDocProductsGroups) => {
                if (productGroup) {
                    productGroup.products.push({_id});
                    return productGroup.save();
                }
            }).catch(function (err) {
                console.log("verch");
            });
        this.group = productGroupId;
        let productQ: Promise<any> = this.save();
        return Promise.all([productQ, productGroupQ]);
    } else {
        productGroupQ = ProductsGroups.findOne({name: "All"}) //all the stuff that do not have productGroup
            .then((productGroup: IDocProductsGroups) => {
                if (productGroup) {
                    productGroup.products.push({_id});
                    return productGroup.save();
                }
                //no product and All does not exits
                const newProductGroup: IDocProductsGroups = new ProductsGroups({name: "All"});
                newProductGroup.products.push({_id});
                return newProductGroup.save();
            });

        return productGroupQ;
    }

};

productSchema.statics.test = function () {

};

const Products: IModelProducts = mongoose.model<IDocProducts, IModelProducts>('Products', productSchema);

export {Products};