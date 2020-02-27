import * as express from "express";
import {body} from "express-validator";
import {register, login, currentUser, registerUser} from "../controllers/users";
import {Users} from "../models/Users";
import {isAuth} from "../utilities/authentication";
import {ROLES} from "../utilities/constants";

const router = express.Router();

router.put("/register", [
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
], register);

router.post("/login", login);

router.post('/register-user',[
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
    body("roles")
        .custom(function(value)  {
            return ROLES.includes(value);
        }),
    body("current_password")
        .custom(function(value, {req})  {
            return value === req.body.password
        }),
    body('name')
        .trim()
        .notEmpty()
],registerUser);

router.get("/current", isAuth(), currentUser);

export default router;