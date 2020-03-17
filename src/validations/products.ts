import {body} from "express-validator";
import {ProductsGroups} from "../models/ProductsGroups";
import {IProductsGroups} from "../interfaces/models/ProductsGroups";
import {Products} from "../models/Products";
import {IProducts} from "../interfaces/models/Products";

export const addProductValidation: Array<any> = [
    body('price')
        .notEmpty()
        .isNumeric(),
    body('name')
        .notEmpty()
        .isLength({min: 2, max: 25})
        .custom(function (value, {req}) {
            if(req.body.productsGroup === '') {
                return Promise.resolve();
            }
            return Products.findOne({name:value,group:req.body.productsGroup}) //TODO check later whether it shouldbe changed
                .then(function (product: IProducts) {
                    if (product) {
                        return Promise.reject("Name inside of this Product Group Exist");
                    }
                });
        }),
    body('productsGroup')
        .custom(function (value, {req}) {
            if(value === '') {
                return Promise.resolve();
            }
            return ProductsGroups.findById(value)
                .then(function (productGroup: IProductsGroups) {
                    if (!productGroup)  { //if it is not found
                        return Promise.reject("Product Group does not exist");
                    }
                });
        })
];

export const editProductValidation: Array<any> = [
    ...addProductValidation
];