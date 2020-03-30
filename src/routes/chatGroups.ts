import * as express from "express";
import {isAuthorized} from "../middlewares/authorisation";
import {paramIdValidation} from "../validations/General";
import {createGroupChat, deleteGroupChat, editGroupChat, getChatGroup, getChatGroups} from "../controllers/chatGroups";

const router = express.Router();

router.get('/', getChatGroups);

router.get('/:id', paramIdValidation, getChatGroup);

router.put('/', createGroupChat);

router.put('/:id', editGroupChat);

router.delete('/:id', deleteGroupChat);

export default router;