import * as express from "express";
import {isAuth, isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN_MANAGER} from "../roles";
import {getRoles} from "../controllers/api";

const router = express.Router();

router.get('/roles',[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getRoles]);

export default router;