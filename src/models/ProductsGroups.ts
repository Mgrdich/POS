import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProductsGroups, IModelProductsGroups} from "../interfaces/models/ProductsGroups";

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

productGroupSchema.statics.deleteById = function (productsGroupID) {

};

const ProductsGroups:IModelProductsGroups = mongoose.model<IDocProductsGroups,IModelProductsGroups>('ProductsGroups', productGroupSchema);

export {ProductsGroups};