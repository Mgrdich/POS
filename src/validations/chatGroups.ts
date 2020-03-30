import {body} from "express-validator";
import {isMongooseValidId} from "../utilities/functions";
import {Users} from "../models/Users";

const addGroupChatValidation: Array<any> = [
    body('name')
        .isString()
        .isLength({min:2,max:20}),
    body('admins')
        .isArray({min:1})
        .custom(async function (value) { //TODO oremove the repetitions
            let idSearch = value.every(item=>isMongooseValidId(item));
            if(idSearch) {
                return Promise.reject("Not all them are id")
            }
            let query = value.map(item=>({_id:item}));
            let users = await Users.find({$and:[...query]});
            if(users.length !== value.length) {
                return Promise.reject("one of the Users is not Found");
            }
        }),
    body('members')
        .isArray({min:1})
        .custom(async function (value) {
            let idSearch = value.every(item=>isMongooseValidId(item));
            if(idSearch) {
                return Promise.reject("Not all them are id")
            }
            let query = value.map(item=>({_id:item}));
            let users = await Users.find({$and:[...query]});
            if(users.length !== value.length) {
                return Promise.reject("one of the Users is not Found");
            }

        })
];