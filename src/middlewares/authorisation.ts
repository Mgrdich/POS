import * as passport from "passport";
import {NextFunction,Request,Response} from "express";
import {RoleType} from "../utilities/roles";

export function isAuth() {
      return passport.authenticate("jwt", {
        session: false
    })
}

export function isAuthorized(whiteList:Array<RoleType>|RoleType) {
    return function (req:Request, res:Response, next:NextFunction)  {
        if(whiteList.includes(req.user["role"])) {
           return next();
        }
        res.status(401).json({
            status:401,
            message:"UnAuthorised"
        });
    }
}

export function NotAuthorized(blackList:Array<RoleType>|RoleType) {
    return function (req:Request, res:Response, next:NextFunction)  {
        if(blackList.includes(req.user["role"])) {
            return res.status(401).json({
                status:401,
                message:"UnAuthorised"
            });
        }
        next();
    }
}