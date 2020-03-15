import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProducts} from "../interfaces/models/Products";

const productSchema: Schema = new Schema({
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
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    modifiedBy:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type:Date,
            }
        }
    ],
    createdDate:{
        type:Date,
        default:Date.now
    },
});

const Products = mongoose.model<IDocProducts>('Products', productSchema);