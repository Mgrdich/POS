import * as express from "express";
import {
    addProductsGroup,
    deleteProductsGroup,
    editProductsGroup,
    getProductsGroup,
    getProductsGroups
} from "../controllers/productsGroups";
import {addProductsGroupValidation} from "../validations/productGroups";

const router = express.Router();


router.get('/', getProductsGroups);

router.get('/:id', getProductsGroup);

router.put('/', addProductsGroupValidation,addProductsGroup);

router.put('/:id', editProductsGroup);

router.delete('/:id', deleteProductsGroup);

export default router;