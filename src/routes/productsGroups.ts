import * as express from "express";
import {
    addProductsGroup,
    deleteProductsGroup,
    editProductsGroup,
    getProductsGroup,
    getProductsGroups
} from "../controllers/productsGroups";

const router = express.Router();


router.get('/', getProductsGroups);

router.get('/:id', getProductsGroup);

router.put('/', addProductsGroup);

router.put('/:id', editProductsGroup);

router.delete('/:id', deleteProductsGroup);

export default router;