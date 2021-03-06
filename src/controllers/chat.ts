import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorValidation} from "../utilities/controllers/error";
import {IDocChat} from "../interfaces/models/Chat";
import {Chats} from "../models/Chat";
import {IDelete, myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../utilities/constants/enums";
import {ITEM_DELETED, NOT_MODIFIED} from "../utilities/constants/messages";


export async function getChatByUid(req: myRequest, res: Response, next: NextFunction) {
    try {
        errorValidation(req);

        const to = req.params.id;
        const chat: IDocChat =
            await Chats.findOne({
                    participants: {$all: [req.user._id, to]}
                }, {participants: 0, createdAt: 0, updatedAt: 0}).lean().populate({
                path:'messages',
                populate:{
                    path:'sender',
                    select:'name'
                }
            });
        if (chat) {
            return res.status(200).json(chat);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChats(req: Request, res: Response, next: NextFunction) {
    try {
        const chats: Array<IDocChat> = await Chats.find({}).lean().populate('messages')/*.populate('participants', 'name')*/;
        if (chats.length) {
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChat(req: Request, res: Response, next: NextFunction) {
    try {
        errorValidation(req);

        const chat:IDocChat = await Chats.findById(req.params.id).lean().populate('messages')/*.populate('participants', 'name')*/;
        if (chat) {
            return res.status(200).json(chat);
        }
        res.status(200).json({empty: true});

    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
        errorValidation(req);

        const response: IDelete = await Chats.deleteOne({_id: req.params.id});
        if (response.ok) {
            alert(res, 200, messageAlert.success, ITEM_DELETED);
        } else {
            alert(res, 304, messageAlert.success, NOT_MODIFIED)
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}

