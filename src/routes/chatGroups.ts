import * as express from "express";
import {isAuthorized} from "../middlewares/authorisation";
import {paramIdValidation} from "../validations/General";
import {getChatGroup, getChatGroups} from "../controllers/chatGroups";

const router = express.Router();

router.get('/',getChatGroups);

router.get('/:id',paramIdValidation,getChatGroup);

