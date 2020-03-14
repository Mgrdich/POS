import {Tables} from "../models/Tables";
import {IDocTables} from "../interfaces/models/Tables";
import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {noResult} from "../utilities/controllers/helpers";
import {IDelete, myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS} from "../utilities/contants/messages";
import {validationResult} from "express-validator";

async function getTables(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let tables:Array<IDocTables> | IDocTables = await Tables.find({});
        if(tables.length) {
            return res.status(200).json(tables);
        }
        noResult(res);
    }catch (err) {
        errorCatcher(next,err);
    }

}

async function getTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let table: IDocTables = await Tables.findById(req.params.Id);
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

async function deleteTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let deletedResult:IDelete  = await Tables.deleteOne({_id:req.params.Id});
        if (deletedResult.ok) {
            alert(res,200,messageAlert.success,ITEM_DELETED);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next,err);
    }
}

async function editTable(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors:any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {number,name} = req.body;
        const table:IDocTables = await Tables.findById(req.params.id);
        if(name) {
            table.name = name;
        }
        table.modifiedBy.push(req.user._id);
        table.modifiedDate = new Date();
        await table.save();
        alert(res,200,messageAlert.success,'Table element has been edited');
    } catch (err) {
        errorCatcher(next,err);
    }
}


export {getTables, getTable, addTable, deleteTable, editTable};