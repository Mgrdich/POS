import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProducts} from "../interfaces/models/Products";

const productGroupSchema: Schema = new Schema({

});

const ProductsGroup = mongoose.model<IDocProducts>('ProductsGroup',productGroupSchema);