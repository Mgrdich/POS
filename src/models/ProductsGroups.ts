import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProductsGroups, IModelProductsGroups} from "../interfaces/models/ProductsGroups";
import {Products} from "./Products";
import {IDocProducts} from "../interfaces/models/Products";

const productGroupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        }
    ],
    createdBy: { //TODO created edit properties should be refactored
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    modifiedBy: [
        {
            _id: { //user id
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type: Date,
            }
        }
    ],
}, {timestamps: true});


productGroupSchema.statics.removeProdFrmProdGrp = function (productId: IDocProducts["_id"], groupId: IDocProductsGroups["_id"]) {
    return ProductsGroups.updateOne({_id: groupId}, {$pull: {products: {"_id": productId}}})
};

productGroupSchema.statics.deleteProductsGroupById = async function (productsGroupID: IDocProductsGroups["_id"]): Promise<any> {
    let toBeDeletedProductGroup: IDocProductsGroups = await this.findOne({_id: productsGroupID});
    let productGroupAll: IDocProductsGroups = await this.findOne({name: 'All'});
    if (!productGroupAll) {
        productGroupAll = new this({name:"All"});
    }
    productGroupAll.products.push(...toBeDeletedProductGroup.products); //should be filtered
    let q1: Promise<any> = toBeDeletedProductGroup.remove();
    let q2: Promise<any> = productGroupAll.save();
    return Promise.all([q1, q2]);

};

const ProductsGroups: IModelProductsGroups = mongoose.model<IDocProductsGroups, IModelProductsGroups>('ProductsGroups', productGroupSchema);

export {ProductsGroups};