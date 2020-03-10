import * as express from "express";
import {addTable, deleteTable, editTable, getTable, getTables} from "../controllers/tables";
const router = express.Router();


router.get('/',getTables);

router.get('/:Id',getTable);

router.put('/',addTable);

router.put('/:Id',editTable);

router.delete('/:Id',deleteTable);


export default router;