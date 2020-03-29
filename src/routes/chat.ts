import * as express from "express";
import {isAuthorized} from "../middlewares/authorisation";
import {Roles} from "../roles";
import {paramIdValidation} from "../validations/General";
import {deleteChat, getChat, getChatId, getChats} from "../controllers/chat";


const router = express.Router();


router.get('/',isAuthorized([Roles.SuperAdmin,Roles.Admin]),getChats);

router.get('/:id',paramIdValidation,getChat);

router.get('/getChatId',getChatId); //Validation should be either one or inside the group

// router.put('/',addOrderValidation,addOrder);

// router.put('/:id',editOrderValidation,editOrders);

router.delete('/:id',paramIdValidation,deleteChat);

export default router;