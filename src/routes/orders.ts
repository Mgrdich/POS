import * as express from "express";
import {
    addOrder,
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

router.get('/products/:productsGroupId',getPosProducts);

router.get('/:id',paramIdValidation,getOrder);

router.put('/',addOrderValidation,addOrder);

router.put('/:id',editOrderValidation,editOrders);

router.delete('/:id',paramIdValidation,deleteOrder);

export default router;