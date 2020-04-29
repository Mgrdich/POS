import {body,query} from "express-validator";
import {Tables} from "../models/Tables";
import {ITables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/constants/arrays";
import {paramIdValidation} from "./General";
import {DateRanges, TableStatus} from "../utilities/constants/enums";

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
        .custom(function(value)  {
            if(Array.isArray(value)) {
                return value.every(function (item:DateRanges) {
                    return !!TableStatus[item]
                })
            }

          return !!TableStatus[value];
        })
];