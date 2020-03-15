import * as express from "express";
import {addProduct, deleteProduct, editProduct, getProduct, getProducts} from "../controllers/products";

const router = express.Router();


router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/', addProduct);

router.put('/:id', editProduct);

router.delete('/:id', deleteProduct);

export default router;