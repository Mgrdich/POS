import * as express from "express";
import {
    getClosedOrdersPricesTables,
    getProductsPrice,
    getClosedOrdersWaiter,
    getClosedOrdersCashier
} from "../controllers/statistics";
import {queryDateValidation} from "../validations/General";
import {isAuthorized} from "../middlewares/authorisation";
import {ROLES_SUPER_ADMIN} from "../roles";
const router = express.Router();

router.get('/products/price', queryDateValidation, isAuthorized(ROLES_SUPER_ADMIN),getProductsPrice);

router.get('/orders/table', queryDateValidation, isAuthorized(ROLES_SUPER_ADMIN),getClosedOrdersPricesTables);

router.get('/orders/waiter', queryDateValidation, isAuthorized(ROLES_SUPER_ADMIN),getClosedOrdersWaiter);

router.get('/orders/cashier', queryDateValidation, isAuthorized(ROLES_SUPER_ADMIN),getClosedOrdersCashier);

export default router;