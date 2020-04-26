import * as express from "express";
import {
    addOrder,
    closeOrder,
    deleteOrder,
    editOrders,
    getOrder,
    getOrders,
    getPosProducts,
    getPosProductsGroups,
    getPosTables
} from "../controllers/orders";
import {paramIdValidation} from "../validations/General";
import {addOrderValidation, editOrderValidation} from "../validations/orders";

const router = express.Router();


router.get('/',getOrders);

router.get('/tables',getPosTables);

router.get('/products-groups',getPosProductsGroups);

router.get('/products/:id',paramIdValidation,getPosProducts);

router.get('/:id',paramIdValidation,getOrder);

router.put('/',addOrderValidation,addOrder);

router.put('/:id',editOrderValidation,editOrders);

router.delete('/:id',paramIdValidation,deleteOrder);

/**
 * Closed Order Routes
 *
 * */

router.post('/close/:id',paramIdValidation,closeOrder);

export default router;