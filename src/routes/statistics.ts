import * as express from "express";
import {
    getClosedOrdersPricesTables,
    getProductsPrice,
    getClosedOrdersWaiter,
    getClosedOrdersCashier
} from "../controllers/statistics";
const router = express.Router();

router.get('/products/price', getProductsPrice);

router.get('/orders/table', getClosedOrdersPricesTables);

router.get('/orders/waiter', getClosedOrdersWaiter);

router.get('/orders/cashier', getClosedOrdersCashier);

export default router;