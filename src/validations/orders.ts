import * as mongoose from "mongoose";
import {body} from "express-validator"

export const addOrderValidation:Array<any> =[
  body('table')
      .custom(function (value) {
         return mongoose.Types.ObjectId.isValid(value);
  }),
  body('createdBy')
      .custom(function (value) {
          return mongoose.Types.ObjectId.isValid(value);
  }),
  body('orders')
      .custom(function (value) {
          return value.every(function (item:string) {
            return mongoose.Types.ObjectId.isValid(value)
          })
      })
];