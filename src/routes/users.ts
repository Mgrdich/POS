import * as express from "express";
import {body} from "express-validator";
import {register, login, currentUser} from "../controllers/users";
import {Users} from "../models/Users";
import {isAuth} from "../utilities/authentication";

const router = express.Router();

router.put("/register", [ //TODO checking password validation
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
    body('name')
        .trim()
        .notEmpty(),
], register);

router.post("/login", login);

router.get("/current", isAuth(), currentUser);

export default router;