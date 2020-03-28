import * as express from "express";
import {addProduct, deleteProduct, editProduct, getProduct, getProducts} from "../controllers/products";
import {addProductValidation, editProductValidation} from "../validations/products";
import {paramIdValidation} from "../validations/General";

const router = express.Router();


router.get('/', getProducts);

router.get('/:id',paramIdValidation,getProduct);

router.put('/', addProductValidation, addProduct);

router.put('/:id', editProductValidation, editProduct);

router.delete('/:id', paramIdValidation,deleteProduct);

export default router;