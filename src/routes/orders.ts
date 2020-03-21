import * as express from "express";
import {addOrder, deleteOrder, editOrders, getOrder, getOrders} from "../controllers/orders";
import {paramIdValidation} from "../validations/General";

const router = express.Router();


router.get('/',getOrders);

router.get('/:id',paramIdValidation,getOrder);

router.put('/',addOrder);

router.put('/:id',editOrders);

router.delete('/:id',paramIdValidation,deleteOrder);

export default router;