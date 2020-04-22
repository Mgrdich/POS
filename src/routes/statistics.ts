import * as express from "express";
import {getClosedOrdersPricesTables, getProductsPrice, getClosedOrdersWaiter} from "../controllers/statistics";
const router = express.Router();

router.get('/products/price', getProductsPrice);

router.get('/orders/table', getClosedOrdersPricesTables);

router.get('/orders/waiter', getClosedOrdersWaiter);

export default router;