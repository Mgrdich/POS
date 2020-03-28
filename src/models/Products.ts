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
    modifiedBy: [ //TODO transformed into another document
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

productSchema.methods.addProduct = async function (productGroupId: IDocProducts["_id"]): Promise<any> {
    let productGrpId = productGroupId;
    let _id = this._id;
    let q1: Promise<any>;
    let q2: Promise<any>;

    if (productGrpId) {
        let productGroup: IDocProductsGroups = await ProductsGroups.findById(productGrpId);
        if (productGroup) {
            productGroup.products.push(_id); //TODO could be transformed into a function
            q1 = productGroup.save();
        }
    } else {
        let productGroup: IDocProductsGroups = await ProductsGroups.findOne({name: "All"});
        if (productGroup) {
            productGrpId = productGroup._id;
            productGroup.products.push(_id);
            q1 = productGroup.save();
        } else {
            const newProductGroup: IDocProductsGroups = new ProductsGroups({name: "All"});
            productGrpId = newProductGroup._id;
            newProductGroup.products.push(_id);
            q1 = newProductGroup.save();
        }
    }

    this.group = productGrpId;
    q2 = this.save();
    return Promise.all([q2, q1]);

};

productSchema.methods.deleteProductById = function (): Promise<any> {
    let q2: Promise<any> = ProductsGroups.removeProdFrmProdGrp(this._id, this.group);
    let q1: any = Products.deleteOne({_id: this._id});
    return Promise.all([q1, q2]);
};

const Products: IModelProducts = mongoose.model<IDocProducts, IModelProducts>('Products', productSchema);

export {Products};