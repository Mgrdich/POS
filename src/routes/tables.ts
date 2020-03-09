import * as express from "express";
import {addTable, deleteTable, editTable, getTable, getTables} from "../controllers/tables";
const router = express.Router();


router.get('/tables',getTables);

router.get('/tables/:Id',getTable);

router.put('/tables',addTable);

router.put('tables/:Id',editTable);

router.delete('/tables/:Id',deleteTable);


export default router;