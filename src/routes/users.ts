import * as express from "express";
import {register, login, currentUser, registerUser, getRoles, getUsers} from "../controllers/users";
import {isAuth,isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN_MANAGER} from "../roles";
import {registerUserValidation, registerValidation} from "../validations/users";

const router = express.Router();

router.get("/",isAuth(),[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getUsers]);

router.put("/register", registerValidation, register);

router.post("/login", login);

router.put('/register-user',isAuth(),registerUserValidation,[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),registerUser]);

router.get('/roles',isAuth(),[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getRoles]);

router.get("/current", isAuth(), currentUser);

export default router;