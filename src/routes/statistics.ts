import * as express from "express";
import {
    getClosedOrdersPricesTables,
    getProductsPrice,
    getClosedOrdersWaiter,
    getClosedOrdersCashier
} from "../controllers/statistics";
import {queryDateValidation} from "../validations/General";
const router = express.Router();

router.get('/products/price', queryDateValidation,getProductsPrice);

router.get('/orders/table', queryDateValidation,getClosedOrdersPricesTables);

router.get('/orders/waiter', queryDateValidation,getClosedOrdersWaiter);

router.get('/orders/cashier', queryDateValidation,getClosedOrdersCashier);

export default router;