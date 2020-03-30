import {NextFunction, Request, Response} from "express";
import {IDocChat} from "../interfaces/models/Chat";
import {Chats} from "../models/Chat";
import {errorCatcher} from "../utilities/controllers/error";
import {GroupsChats} from "../models/ChatGroups";
import {IDocGroupsChat} from "../interfaces/models/ChatGroups";

export async function getChatGroups(req: Request, res: Response, next: NextFunction) {
    try {
        const chats: Array<IDocChat> = await GroupsChats.find({}).populate('messages').populate('participants', 'name');
        if (chats.length) {
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChatGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const chats: IDocGroupsChat = await GroupsChats.findById(req.params.id).populate('messages').populate('participants', 'name');
        if (chats) {
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}
