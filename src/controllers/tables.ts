import {Tables} from "../models/Tables";
import {IDocTables} from "../interfaces/models/Tables";
import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorThrower} from "../utilities/controllers/error";
import {noResult} from "../utilities/controllers/helpers";
import {IDelete} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS} from "../utilities/contants/messages";

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

async function addTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

    } catch (err) {

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

async function editTable(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

    } catch (err) {

    }
}


export {getTables, getTable, addTable, deleteTable, editTable};