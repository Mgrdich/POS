import {body} from "express-validator";

export const addProductsGroupValidation:Array<any> = [
    body('name')
        .isLength({min: 2, max: 25})
];