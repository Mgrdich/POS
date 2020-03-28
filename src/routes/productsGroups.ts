import * as express from "express";
import {
    addProductsGroup,
    deleteProductsGroup,
    editProductsGroup,
    getProductsGroup,
    getProductsGroups
} from "../controllers/productsGroups";
import {
    addProductsGroupValidation,
    deleteProductsGroupValidation,
    editProductsGroupValidation
} from "../validations/productGroups";
import {paramIdValidation} from "../validations/General";

const router = express.Router();


router.get('/', getProductsGroups);

router.get('/:id', paramIdValidation ,getProductsGroup);

router.put('/', addProductsGroupValidation,addProductsGroup);

router.put('/:id', editProductsGroupValidation,editProductsGroup); //TODO should be continued

router.delete('/:id', deleteProductsGroupValidation,deleteProductsGroup);

export default router;