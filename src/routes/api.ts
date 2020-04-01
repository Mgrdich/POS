import * as express from "express";
import {isAuth, isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN_MANAGER} from "../roles";
import {getProductsGroupApi, getRolesApi, getUsersApi} from "../controllers/api";


const router = express.Router();

router.get('/roles',[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getRolesApi]);

router.get('/products-group',[isAuthorized(ROLES_SUPER_ADMIN_MANAGER),getProductsGroupApi]);

router.get('/users',getUsersApi);

export default router;