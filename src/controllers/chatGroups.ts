import {NextFunction, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower, errorValidation} from "../utilities/controllers/error";
import {GroupsChats} from "../models/ChatGroups";
import {IDocGroupsChat} from "../interfaces/models/ChatGroups";
import {validationResult} from "express-validator";
import {IDelete, myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../utilities/constants/enums";
import {FORBIDDEN, ITEM_DELETED, NOT_MODIFIED} from "../utilities/constants/messages";

export async function getChatGroups(req: myRequest, res: Response, next: NextFunction) {
    try {
        const chats: Array<IDocGroupsChat> =
            await GroupsChats.find({$or: [{members: {$in: [req.user._id]}}, {admins: {$in: [req.user._id]}}]})
            .populate('messages')
            .populate('participants', 'name');
        if (chats.length) {
           /* const newchat:Array<IGroupsChat> = chats.map(function (item:IGroupsChat) {
                item.admins = item.admins.filter((item)=>!sameObjectId(item,req.user._id));
                item.members = item.members.filter((item)=>!sameObjectId(item,req.user._id));
                return item;
            });*/
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getChatGroup(req: myRequest, res: Response, next: NextFunction) {
    try {
        errorValidation(req);
        const chats: IDocGroupsChat = await GroupsChats.findById(req.params.id).populate([{
            path: 'messages',
            populate: {
                path: 'sender',
                select: 'name'
            }
        },{
            path:'admins',
            select:'name'
        },{
            path:'members',
            select:'name'
        }]);

        if (chats) {
            // chats.admins = chats.admins.filter((item)=>!sameObjectId(item,req.user._id));
            // chats.members = chats.members.filter((item)=>!sameObjectId(item,req.user._id));
            return res.status(200).json(chats);
        }
        res.status(200).json({empty: true});
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function createGroupChat(req: myRequest, res: Response, next: NextFunction) {
    try {
        errorValidation(req);

        const {name, admins, members} = req.body;
        let newAdmins = [...admins];
        let newMembers = [...members];
        const groupChat: IDocGroupsChat = new GroupsChats({name, admins: newAdmins, members: newMembers});
        groupChat.createdBy = req.user._id;
        await groupChat.save();
        alert(res, 200, messageAlert.success, 'Group chat is created');
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function editGroupChat(req: myRequest, res: Response, next: NextFunction) {
    try {
        errorValidation(req);

        const {name, admins, members} = req.body;

        const groupChat: IDocGroupsChat = await GroupsChats.findOne({
            _id: req.params.id,
            admins: {$in: [req.user._id]}
        });
        if (!groupChat) {
            errorThrower(FORBIDDEN, 422);
        }
        groupChat.name = name; //TODO check out whether it needs checking or not
        groupChat.admins = [...admins];
        groupChat.members = [...members];
        groupChat.modifiedBy.push({_id: req.user._id, modifiedDate: new Date()});
        await groupChat.save();
        alert(res, 200, messageAlert.success, 'Group chat is edited');
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function deleteGroupChat(req: myRequest, res: Response, next: NextFunction) { //TODO refactor with decorators
    try {
        errorValidation(req);
        
        const response: IDelete = await GroupsChats.deleteOne({_id: req.params.id,admins: {$in: [req.user._id]}});
        if (response.ok) {
            alert(res, 200, messageAlert.success, ITEM_DELETED);
        } else {
            alert(res, 304, messageAlert.success, NOT_MODIFIED)
        }
    } catch (err) {
        errorCatcher(next, err);
    }
}
