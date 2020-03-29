import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {IDocChat} from "../interfaces/models/Chat";
import {Chats} from "../models/Chat";
import {myRequest} from "../interfaces/General";


export async function getChatByUid(req: myRequest, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const to = req.params.id;
        console.log();
        const chat:IDocChat = await Chats.findOne({participants:{$all:[req.user._id,to]}});
        if(chat) {
            return res.status(200).json(chat);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChats(req: Request, res: Response, next: NextFunction) {
    try {
        const chats:Array<IDocChat> = await Chats.find({}).populate('messages').populate('participants','name');
        if(chats.length) {
            return res.status(200).json(chats);
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

