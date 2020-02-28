import {Request, Response, NextFunction} from 'express';
import {Users} from "../models/Users";
import {IDocUser} from "../interfaces/models/Users";
import {validationResult} from "express-validator";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {SECRET_KEY} from "../config/keys";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/error";


async function register(req: Request, res: Response, next: NextFunction):Promise<any> {
    try {
        const errors:any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {email, name, password} = req.body;
        const newUser: IDocUser = new Users({email, name, password});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        let savedUser: any = await newUser.save();
        res.status(200).json({...savedUser._doc});
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
        const newUser: IDocUser = new Users({email, name, password,role});

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        let savedUser: any = await newUser.save();
        res.status(200).json({...savedUser._doc});
    } catch (err) {
        errorCatcher(next, err);
    }
}

function getRoles(req: Request, res: Response,nextFunction) {
    const RolesArray:Array<any> = [
        {
            value:1,
            placeholder:"admin"
        },
        {
            value:2,
            placeholder:"manager"
        },
        {
            value:3,
            placeholder:"employee"
        }
    ];
    res.status(200).json(RolesArray);
}

async function currentUser(req: Request, res: Response, next: NextFunction):Promise<any> {
    res.status(200).json(req["user"]);
}


export {register, login, currentUser,registerUser,getRoles};