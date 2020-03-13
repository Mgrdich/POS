import * as express from "express";
import {addTable, deleteTable, editTable, getTable, getTables} from "../controllers/tables";
import {addTableValidations} from "../validations/tables";
const router = express.Router();


router.get('/',getTables);

router.get('/:Id',getTable);

router.put('/',addTableValidations,addTable);

router.put('/:Id',editTable);

router.delete('/:Id',deleteTable);


export default router;