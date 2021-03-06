import {body, param} from "express-validator";
import {ProductsGroups} from "../models/ProductsGroups";
import {IProductsGroups} from "../interfaces/models/ProductsGroups";
import {Products} from "../models/Products";
import {IProducts} from "../interfaces/models/Products";
import * as mongoose from "mongoose";
import {paramIdValidation} from "./General";
import {isMongooseValidId} from "../utilities/functions";
import {INVALID_ID} from "../utilities/constants/messages";

export const addProductValidation: Array<any> = [
    body('price')
        .notEmpty()
        .isNumeric(),
    body('name')
        .notEmpty()
        .isLength({min: 2, max: 25})
        .custom(function (value, {req}) {
            if (!req.body.productsGroup) {
                return Promise.resolve();
            }

            if (!isMongooseValidId(req.body.productsGroup)) {
                return Promise.reject(INVALID_ID);
            }

            return Products.findOne({
                name: value,
                group: req.body.productsGroup
            })
                .then(function (product: IProducts) {
                    if (product) {
                        return Promise.reject("Name inside of this Product Group Exist");
                    }
                });
        }),
    body('productsGroup')
        .custom(function (value) {
            if(!value) {
                return Promise.resolve();
            }
            if(!isMongooseValidId(value)) {
                return false;
            }
            return ProductsGroups.findById(value)
                .then(function (productGroup: IProductsGroups) {
                    if (!productGroup) { //if it is not found
                        return Promise.reject("Product Group does not exist");
                    }
                });
        })
];

export const editProductValidation: Array<any> = [ //also params validation to check whether it exists
    ...addProductValidation,
    ...paramIdValidation
];