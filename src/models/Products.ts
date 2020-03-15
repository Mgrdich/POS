import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import {IDocProducts} from "../interfaces/models/Products";

const productSchema: Schema = new Schema({

});

const Products =  mongoose.model<IDocProducts>('Products',productSchema);