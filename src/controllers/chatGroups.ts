import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {GroupsChats} from "../models/ChatGroups";
import {IDocGroupsChat} from "../interfaces/models/ChatGroups";
import {validationResult} from "express-validator";
import {IDelete, myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {Users} from "../models/Users";
import {FORBIDDEN, ITEM_DELETED, NOT_MODIFIED} from "../utilities/constants/messages";

export async function getChatGroups(req: myRequest, res: Response, next: NextFunction) {
    try {
        const chats: Array<IDocGroupsChat> = await GroupsChats.find({members: {$in: [req.user._id]}})
            .populate('messages')
            .populate('participants', 'name');
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
        const chats: IDocGroupsChat = await GroupsChats.findById(req.params.id).populate({
            path:'messages',
            populate:{
                path:'sender',
                select:'name'
            }});
        
        if (chats) {
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function createGroupChat(req: myRequest, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {name, admins, members} = req.body;
        const groupChat: IDocGroupsChat = new GroupsChats({name, admins, members});
        groupChat.createdBy = req.user._id;
        await groupChat.save();
        alert(res, 200, messageAlert.success, 'Group chat is created');
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function editGroupChat(req: myRequest, res: Response, next: NextFunction) {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {name, admins, members} = req.body;
        const groupChat: IDocGroupsChat = await GroupsChats.findOne({
            _id: req.params.id,
            $in: {admins: [req.user._id]}
        });
        if (!groupChat) {
            errorThrower(FORBIDDEN, 422);
        }
        groupChat.name = name;
        groupChat.admins = [...admins];
        groupChat.members = [...members];
        groupChat.modifiedBy.push({_id: req.user._id, modifiedDate: new Date()});
        await groupChat.save();
        alert(res, 200, messageAlert.success, 'Group chat is edited');
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function deleteGroupChat(req: Request, res: Response, next: NextFunction) { //TODO refactor with decorators
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const response: IDelete = await Users.deleteOne({_id: req.params.id});
        if (response.ok) {
            alert(res, 200, messageAlert.success, ITEM_DELETED);
        } else {
            alert(res, 304, messageAlert.success, NOT_MODIFIED)
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}
