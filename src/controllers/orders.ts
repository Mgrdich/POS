import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS, NOT_MODIFIED} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {validationResult} from "express-validator";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";

export async function getOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getOrders(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function addOrder(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function editOrders(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }


    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

    } catch (err) {
        errorCatcher(next,err);
    }
}