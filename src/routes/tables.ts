import * as express from "express";
import {
    addTable,
    deleteTable,
    editTable,
    getTable,
    getTables,
    toggleStatusTable
} from "../controllers/tables";
import {addTableValidations, editTableValidations} from "../validations/tables";
import {paramIdValidation} from "../validations/General";
const router = express.Router();


router.get('/',getTables);

router.get('/:id',getTable);

router.put('/',addTableValidations,addTable);

router.patch('/status/:id',paramIdValidation,toggleStatusTable);

router.put('/:id',editTableValidations,editTable);

router.delete('/:id',deleteTable);


export default router;