import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";

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

const ProductsGroups = mongoose.model<IDocProductsGroups>('ProductsGroups', productGroupSchema);

export {ProductsGroups};