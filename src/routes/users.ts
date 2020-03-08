import * as express from "express";
import {register, login, currentUser, registerUser, getUsers, changePassword} from "../controllers/users";
import {isAuth,isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN_MANAGER} from "../roles";
import {changePasswordValidation, registerUserValidation, registerValidation} from "../validations/users";

const router = express.Router();

router.get("/",isAuth(),[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getUsers]);

router.put("/register", registerValidation, register);

router.post("/login", login);

router.put('/register-user',isAuth(),registerUserValidation,[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),registerUser]);

router.patch('/change-password',isAuth(),changePasswordValidation,changePassword);

router.get("/current", isAuth(), [isAuthorized(ROLES_SUPER_ADMIN_MANAGER),currentUser]);

export default router;