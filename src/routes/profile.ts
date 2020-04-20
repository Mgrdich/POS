import * as express from "express";
import {getPricesTables, getOrdersWaiter, getProductsTable} from "../controllers/statistics";
const router = express.Router();

router.get('/price/table', getPricesTables);

router.get('/product/table', getProductsTable);

router.get('/orders/waiter', getOrdersWaiter);

export default router;