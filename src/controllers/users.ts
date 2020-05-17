import {Users} from "../models/Users";
import {validationResult} from "express-validator";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {errorCatcher, errorFormatter, errorThrower, errorValidation} from "../utilities/controllers/error";
import {alert} from "../utilities/controllers/messages";
import {blackListFilterObj, tableDataNormalize} from "../utilities/reformaters";
import {NextFunction, Request, Response} from 'express';
import {IDocUsers, IUser} from "../interfaces/models/Users";
import {myRequest} from "../interfaces/General";
import {messageAlert} from "../utilities/constants/enums";
import {GET_USERS_TABLE} from "../utilities/tables/constants";
import {SECRET_KEY} from "../config/keys";
import {ROLES_PRIORITY} from "../roles";
import {ITEM_DELETED, NOT_MODIFIED} from "../utilities/constants/messages";
import {noResult} from "../utilities/controllers/helpers";

async function register(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {email, name, password} = req.body;
        const newUser: IDocUsers = new Users({email, name, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        if(await newUser.save()){
            return alert(res, 200, messageAlert.success, 'Registered Successfully');
        }
        alert(res, 304, messageAlert.success, NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {email, password} = req.body;
    try {
        const user: any = await Users.findOne({email});
        if (!user) {
            return res.status(422).json({email: 'no users found'})
        }

        let isMatch: boolean = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({email: 'Wrong Auth'})
        }
        const payload: any = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            role: user.role
        };
        const token: string = await jwt.sign(payload, SECRET_KEY, {expiresIn: 3600});
        res.status(200).json({success: true, token: `Bearer ${token}`});

    } catch (err) {
        errorCatcher(next, err);
    }

}

async function registerUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const {email, name, password, role} = req.body;
        const newUser: IDocUsers = new Users({email, name, password, role});

        newUser.rolePriority = ROLES_PRIORITY[role];

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        if(await newUser.save()) {
            return alert(res, 200, messageAlert.success, 'New user is registered');
        }
        alert(res, 304, messageAlert.success, NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function editUser(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const {email, name} = req.body;
        const currentUser: IDocUsers = await Users.findById(req.user._id);
        currentUser.email = email;
        currentUser.name = name;
        if(await currentUser.save()){
            return alert(res, 200, messageAlert.success, 'user Data is edited');
        }
        alert(res, 304, messageAlert.success, NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function changePassword(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const {new_password} = req.body;
        const currentUser: IDocUsers = await Users.findById(req.user._id);
        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(new_password, salt);
        if(await currentUser.save()){
            return alert(res, 200, messageAlert.success, 'Password is Changed');
        }
        alert(res, 304, messageAlert.success, NOT_MODIFIED);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function currentUser(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    let obj: object = blackListFilterObj(req.user["_doc"], ['password', 'rolePriority']);
    res.status(200).json(obj);
}

async function getUsers(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    const rolePriority = req.user.rolePriority;
    try {
        errorValidation(req);
        let users: Array<IDocUsers> = await Users.find({
            "rolePriority": {$lt: rolePriority},
            "_id": {$ne: req.user._id},
            "disabled":{$ne:true}
        }, {rolePriority: 0, password: 0}).lean();
        let tableUsers;
        if (!users) {
            return noResult(res);
        } else {
            tableUsers = tableDataNormalize(users, GET_USERS_TABLE);
        }
        res.status(200).json(tableUsers);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function getUsersRole(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const users: Array<IUser> =
            await Users.find({
                role: req.params.role,
                disabled: {$ne: true}
            }, {_id: 1, name: 1}).lean();
        if(users.length) {
            return res.status(200).json(users);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}


async function getUsersChat(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    const rolePriority = req.user.rolePriority;
    try {
        let users: Array<IDocUsers>;
        if (rolePriority >= -2) {
            users = await Users.find({
                _id: {$ne: req.user._id},
                disabled: {$ne: true}
            }, {rolePriority: 0, password: 0}).lean();
        } else {
            users = await Users.find({
                "rolePriority": {$gt: rolePriority},
                "_id": {$ne: req.user._id},
                disabled: {$ne: true}
            }, {rolePriority: 0, password: 0}).lean();
        }
        res.status(200).json(users);
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function deleteUser(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        errorValidation(req);

        const user: IDocUsers = await Users.findById(req.params.id);
        if (user) {
            user.disabled = true;
            if (await user.save()) {
                return alert(res, 200, messageAlert.success, ITEM_DELETED);
            }
        }
        alert(res, 304, messageAlert.success, NOT_MODIFIED)
    } catch (err) {
        errorCatcher(next, err);
    }
}

export {register, login, currentUser, registerUser, editUser, getUsers, changePassword, deleteUser, getUsersChat,getUsersRole};