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
            _id: { //user id
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

productSchema.methods.addProduct = function (productGroupId:IDocProducts["_id"]): Promise<any> {
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
                console.log(err);
            });
        this.group = productGroupId;
        let productQ: Promise<any> = this.save();
        return Promise.all([productQ, productGroupQ]);
    } else {
        productGroupQ = ProductsGroups.findOne({name: "All"}) //all the stuff that do not have productGroup
            .then(function(productGroup: IDocProductsGroups) {
                if (productGroup) {
                    productGroup.products.push({_id}); //not unique inside if group is not selected
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

productSchema.methods.deleteProductById = function():Promise<any> {
    let q2:Promise<any>  = ProductsGroups.removeProdFrmProdGrp(this._id,this.group);
    let q1: any = Products.deleteOne({_id:this._id});
    return Promise.all([q1,q2]);
};

const Products: IModelProducts = mongoose.model<IDocProducts, IModelProducts>('Products', productSchema);

export {Products};