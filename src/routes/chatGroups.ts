import * as express from "express";
import {paramIdValidation} from "../validations/General";
import {createGroupChat, deleteGroupChat, editGroupChat, getChatGroup, getChatGroups} from "../controllers/chatGroups";
import {addGroupChatValidation, editGroupChatValidation} from "../validations/chatGroups";

const router = express.Router();

router.get('/', getChatGroups);

router.get('/:id', paramIdValidation, getChatGroup);

router.put('/', addGroupChatValidation,createGroupChat);

router.put('/:id', editGroupChatValidation,editGroupChat);

router.delete('/:id', deleteGroupChat);

export default router;