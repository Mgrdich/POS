import {Response} from 'express';
import {messageAlert} from "../constants/enums";
import {SOMETHING_WENT_WRONG} from "../constants/messages";

export function alert(res:Response,status:number,type:messageAlert,message:string){
    res.status(status).json({
       alert:type,
       message:message
    });
}

export function somethingWentWrong(res:Response) {
    res.status(500).json({
        message:SOMETHING_WENT_WRONG
    });
}