import * as express from "express";
import users from "./routes/users";
import {isAuth, isAuthorized} from "./middlewares/authorisation";
import chat from "./routes/chat";
import groupChat from "./routes/chatGroups";
import api from "./routes/api";
import {ROLES_SUPER_ADMIN_ADMIN, ROLES_SUPER_ADMIN_MANAGER, ROLES_SUPER_ADMIN_MANAGER_CASHIER} from "./roles";
import orders from "./routes/orders";
import tables from "./routes/tables";
import products from "./routes/products";
import productsGroups from "./routes/productsGroups";
import statistics from "./routes/statistics";

const router = express.Router();

router.use('/users', users);

router.use(isAuth()); //all the routes should require an Authorization

router.use('/chat',chat);

router.use('/group-chat',groupChat);

router.use('/api', api);


/**
 * Super Admin ,Admin ,Manager, Cashier Roles
 * */
router.use(isAuthorized(ROLES_SUPER_ADMIN_MANAGER_CASHIER));

router.use('/orders', orders);

/**
 * Super Admin ,Admin ,Manager Roles
 * */
router.use(isAuthorized(ROLES_SUPER_ADMIN_MANAGER));

router.use('/tables', tables);

router.use('/products', products);

router.use('/products-group', productsGroups);

/**
 * Super Admin ,Admin Roles
 * */
router.use(isAuthorized(ROLES_SUPER_ADMIN_ADMIN));

router.use('/statistics',statistics);

export default router;
