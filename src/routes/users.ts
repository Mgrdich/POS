import * as express from "express";
import {body} from "express-validator";
import {register, login, currentUser, registerUser, getRoles} from "../controllers/users";
import {Users} from "../models/Users";
import {isAuth,isAuthorized} from "../middlewares/authorisation";
import {ROLES_ALL} from "../utilities/roles";
import {Roles} from "../utilities/roles";

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

router.put('/register-user',isAuth(),[
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
],[isAuthorized([Roles.Admin,Roles.Manager]),registerUser]);

router.get('/roles',isAuth(),[isAuthorized([Roles.Admin,Roles.Manager]),getRoles]);

router.get("/current", isAuth, currentUser);

export default router;