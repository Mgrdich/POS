import {Tables} from "../models/Tables";
import {IDocTables, ITables} from "../interfaces/models/Tables";
import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower, errorValidation} from "../utilities/controllers/error";
import {noResult} from "../utilities/controllers/helpers";
import {IDelete, myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../utilities/constants/enums";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS} from "../utilities/constants/messages";
import {validationResult} from "express-validator";
import {tableDataNormalize} from "../utilities/reformaters";
import {GET_TABLES_TABLE, GET_TABLES_TABLE_STATUS} from "../utilities/tables/constants";
import {TableStatus} from "../utilities/constants/enums";


//TODO pagination with skip and limit operators
async function getTables(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let tables:Array<IDocTables> | IDocTables = await Tables.find({}).lean();
        if(tables.length) {
            const tablizeTable = tableDataNormalize(tables,GET_TABLES_TABLE);
            return res.status(200).json(tablizeTable);
        }
        noResult(res);
    }catch (err) {
        errorCatcher(next,err);
    }
}

async function getTableStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);
        const tables:Array<ITables> = await Tables.find({status:{$in:req.query.type}},{name:1,number:1,status:1,createdAt:1}).lean();
        if(tables.length) {
            const tablizeTable = tableDataNormalize(tables,GET_TABLES_TABLE_STATUS);
            return res.status(200).json(tablizeTable);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next,err);
    }

}

async function getTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        let table: IDocTables = await Tables.findById(req.params.id).lean();
        if (!table) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422);
        }
        return res.status(200).json(table);
    } catch (err) {
        errorCatcher(next,err);
    }
}

async function addTable(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors:any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {number,name} = req.body;
        const table:IDocTables = new Tables({number});
        table.createdBy = req.user._id;
        if(name) {
            table.name = name;
        }
        await table.save();
        alert(res,200,messageAlert.success,'New Table is registered');
    } catch (err) {
        errorCatcher(next,err);
    }

}

async function editTable(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const {number,name} = req.body;
        const table:IDocTables = await Tables.findById(req.params.id);
        if(name) {
            table.name = name;
        }
        table.number = number;
        table.modifiedBy.push({"_id": req.user._id, modifiedDate: new Date()});
        await table.save();
        alert(res,200,messageAlert.success,'Table element has been edited');
    } catch (err) {
        errorCatcher(next,err);
    }
}

async function toggleStatusTable(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const table:IDocTables = await Tables.findById(req.params.id);
        if (!table) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422);
        }
        if(table.status === TableStatus.closed) {
            table.status = TableStatus.reserved;
        } else  {
            table.status = TableStatus.closed;
        }
        const savedTable:ITables = await table.save();
        if(savedTable){ //TODO something went Wrong add that option
            alert(res,200,messageAlert.success,'Table status has been changed');
        }
    } catch (err) {
        errorCatcher(next,err);
    }
}

async function deleteTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        let deletedResult:IDelete  = await Tables.deleteOne({_id:req.params.id});
        if (deletedResult.ok && deletedResult.deletedCount) { //TODO check the validity of this code
            alert(res,200,messageAlert.success,ITEM_DELETED);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next,err);
    }
}

export {getTables, getTable, addTable, deleteTable, editTable,toggleStatusTable,getTableStatus};