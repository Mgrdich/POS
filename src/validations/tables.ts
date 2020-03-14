import {body} from "express-validator";
import {Tables} from "../models/Tables";
import {ITables} from "../interfaces/models/Tables";

export const addTableValidations = [
  body('number')
      .isNumeric()
      .custom(function(value, {req})  {
    return Tables.findOne({number: value}).then(function(tableDoc:ITables) {
      if (tableDoc) {
        return Promise.reject("Table Number Exist");
      }
    });
  }),
  body('name')
      .optional()
      .isLength({min: 2, max: 10})
];

export const editTableValidations = [
    ...addTableValidations
];