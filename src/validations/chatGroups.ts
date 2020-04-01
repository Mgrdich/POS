import {body} from "express-validator";
import {isMongooseValidId} from "../utilities/functions";
import {Users} from "../models/Users";
import {NOT_ALL_IDS} from "../utilities/constants/messages";
import {IDocUsers} from "../interfaces/models/Users";

export const addGroupChatValidation: Array<any> = [
    body('name')
        .isString()
        .isLength({min:2,max:20}),
    body('admins')
        .isArray({min:1})
        .custom(async function (value) { //TODO oremove the repetitions
            let idSearch = value.every(item=>isMongooseValidId(item));
            if(!idSearch) {
                return Promise.reject(NOT_ALL_IDS)
            }
            let users:Array<IDocUsers> = await Users.find({'_id': { $in: [...value]}});
            if(users.length !== value.length) {
                return Promise.reject("at least one of the Users is not Found");
            }
        }),
    body('members')
        .isArray({min:1})
        .custom(async function (value) {
            let idSearch = value.every(item=>isMongooseValidId(item));
            if(!idSearch) {
                return Promise.reject(NOT_ALL_IDS)
            }
            let users:Array<IDocUsers> = await Users.find({'_id': { $in: [...value]}});
            if(users.length !== value.length) {
                return Promise.reject("at least one of the Users is not Found");
            }

        })
];

export const editGroupChatValidation:Array<any> = [
    ...addGroupChatValidation,
];