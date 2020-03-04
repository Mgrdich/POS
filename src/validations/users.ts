import {body} from "express-validator";
import {Users} from "../models/Users";
import {ROLES_ALL} from "../roles";

//TODO remove the repetitions

export const registerValidation:Array<any> = [
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail(),
    body("password")
        .trim()
        .isLength({min: 5}),
    body("current_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty(),
];

export const registerUserValidation:Array<any> = [
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail(),
    body("password")
        .trim()
        .isLength({min: 5}),
    body("role")
        .custom(function(value)  {
            return ROLES_ALL.includes(value);
        }),
    body("current_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty()
];