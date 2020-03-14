import {body} from "express-validator";
import {Users} from "../models/Users";
import {ROLES_ALL} from "../roles";
import * as bcrypt from "bcryptjs";

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
    body("confirm_password")
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
    body("confirm_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty()
];

export const editUserValidation:Array<any> = [
    body('name')
        .trim()
        .notEmpty(),
    body("email")
        .isEmail()
        .bail()
        .withMessage("Enter a valid Email")
        .custom(function(value, {req})  {
            if(value === req.user.email) { //leaving the same email
                return  true;
            }
            return Users.findOne({email: value}).then(function(userDoc) {
                if (userDoc) {
                    return Promise.reject("Email already registered");
                }
            });
        }).normalizeEmail()
];

export const changePasswordValidation: Array<any> = [
    body("current_password").notEmpty().custom( function (value, {req}){
        return bcrypt.compare(value, req.user.password).then(function (match:boolean){
            if(!match) {
                return Promise.reject("Wrong Password");
            }
        })
    }),
    body("new_password")
        .trim()
        .isLength({min: 5}),
    body("confirm_new_password").custom(function (value, {req}) {
        return value === req.body.new_password;
    })
];