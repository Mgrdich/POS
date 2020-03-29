import {body, param} from "express-validator";
import {ProductsGroups} from "../models/ProductsGroups";
import {IProductsGroups} from "../interfaces/models/ProductsGroups";
import {paramIdValidation} from "./General";

export const addProductsGroupValidation: Array<any> = [
    body('name')
        .isLength({min: 2, max: 25})
];

export const editProductsGroupValidation: Array<any> =  [
    ...addProductsGroupValidation,...paramIdValidation
];

export const deleteProductsGroupValidation: Array<any> = [
    param('id')
        .custom(function (value) {
            return ProductsGroups.findOne({_id: value}).then(function (productsGroup: IProductsGroups) {
                if (!productsGroup) {
                    return Promise.reject("Product Group is not Found");
                }
                if (productsGroup.name === 'All') {
                    return Promise.reject("Can not delete Product Group All");
                }
            });
        })
];