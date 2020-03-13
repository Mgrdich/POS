import {body} from "express-validator";

export const addTableValidations = [
  body('number')
      .isNumeric()
];