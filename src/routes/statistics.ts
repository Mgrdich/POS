import * as express from "express";
import {getOrdersWaiter, getProductsPrice, getOrdersPricesTables} from "../controllers/statistics";
const router = express.Router();

router.get('/products/price', getProductsPrice);

router.get('/orders/table', getOrdersPricesTables);

router.get('/orders/waiter', getOrdersWaiter);

export default router;