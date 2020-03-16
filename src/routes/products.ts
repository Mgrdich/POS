import * as express from "express";
import {addProduct, deleteProduct, editProduct, getProduct, getProducts} from "../controllers/products";
import {addProductValidation, editProductValidation} from "../validations/products";

const router = express.Router();


router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/', addProductValidation, addProduct);

router.put('/:id', editProductValidation, editProduct);

router.delete('/:id', deleteProduct);

export default router;