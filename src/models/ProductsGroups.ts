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
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
            },
        }
    ],
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
    }
});


productGroupSchema.statics.removeProdFrmProdGrp = function (productId:IDocProducts["_id"],groupId:IDocProductsGroups["_id"]) {
    return ProductsGroups.updateOne({_id: groupId},{$pull:{products:{"_id":productId}}})
};

const ProductsGroups:IModelProductsGroups = mongoose.model<IDocProductsGroups,IModelProductsGroups>('ProductsGroups', productGroupSchema);

export {ProductsGroups};