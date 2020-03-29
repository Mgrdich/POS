import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";


export async function getChatId(req: Request, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChats(req: Request, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChat(req: Request, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

