import {body,query} from "express-validator";
import {Tables} from "../models/Tables";
import {ITables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/constants/arrays";
import {paramIdValidation} from "./General";

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
    ...addTableValidations,
    ...paramIdValidation
];

export const getTableStatusValidations = [
    query('type')
        .isString()
        .custom(function(value)  {
          if(!TABLE_STATUS.includes(value)) { //TODO replace with the Enum
            return Promise.reject('Invalid Table Status');
          }
          return true;
        })
];