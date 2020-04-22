import {Response} from 'express';
import {messageAlert} from "../constants/enums";

export function alert(res:Response,status:number,type:messageAlert,message:string){
    res.status(status).json({
       alert:type,
       message:message
    });
}