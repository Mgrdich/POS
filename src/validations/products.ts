import {body} from "express-validator";

export const addProductValidation:Array<any> = [
    body('price')
        .isNumeric(),
    body('name')
        .optional()
        .isLength({min: 2, max: 25})
];

export const editProductValidation:Array<any> = [
    ...addProductValidation
];