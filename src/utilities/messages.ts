import {Response} from 'express';
import {messageAlertType} from "../interfaces/util";

export function alert(res:Response,status:number,type:messageAlertType,message:string){
    res.status(status).json({
       alert:type,
       message:message
    });
}