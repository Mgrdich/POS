import {NextFunction, Request, Response} from 'express';
import {Users} from "../models/Users";
import {IDocUsers, IUser} from "../interfaces/models/Users";
import {validationResult} from "express-validator";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {SECRET_KEY} from "../config/keys";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/error";
import {myRequest} from "../interfaces/General";
import {ROLES_PRIORITY} from "../roles";
import {messageAlert} from "../interfaces/util";
import {alert} from "../utilities/messages";
import {blackListFilterObj} from "../utilities/reformaters";

async function register(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {
        const errors:any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {email, name, password} = req.body;
        const newUser: IDocUsers = new Users({email, name, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        alert(res,200,messageAlert.success,'Registered Successfully');
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function login(req: Request, res: Response, next: NextFunction):Promise<any> {
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
            role:user.role
        };
        const token: string = await jwt.sign(payload, SECRET_KEY, {expiresIn: 3600});
        res.status(200).json({success: true, token: `Bearer ${token}`});

    } catch (err) {
        errorCatcher(next, err);
    }

}

async function registerUser(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {
        const errors:any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {email, name, password,role} = req.body;
        const newUser: IDocUsers = new Users({email, name, password,role});

        newUser.rolePriority = ROLES_PRIORITY[role];

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        alert(res,200,messageAlert.success,'New user is registered');
    } catch (err) {
        errorCatcher(next, err);
    }
}

async function changePassword(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {new_password} = req.body;
        const currentUser:IDocUsers = await Users.findById(req.user._id);
        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(new_password, salt);
        await currentUser.save();
        alert(res,200,messageAlert.success,'Password is Changed');
    } catch (err) {
        errorCatcher(next,err);
    }
}

async function currentUser(req: myRequest, res: Response, next: NextFunction):Promise<any> {
    let obj:object = blackListFilterObj(req.user["_doc"],['password','rolePriority']);
    res.status(200).json(obj);
}

async function getUsers(req: myRequest, res: Response, next: NextFunction):Promise<any> {
    const rolePriority = req.user.rolePriority;
    try {
        let users:IUser | object =  await Users.find({"rolePriority":{$lt:rolePriority}});
        if(!users) {
            users = {};
        }
        res.status(200).json(users);
    } catch (err) {
        errorCatcher(next,err);
    }
}

export {register, login, currentUser,registerUser,getUsers,changePassword};