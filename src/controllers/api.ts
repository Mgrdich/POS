import {NextFunction, Request, Response} from "express";
import {RoleType} from "../interfaces/roles";
import {getSmallerRoles, normalizeRolesForm} from "../utilities/roles";
import {IDropDowns} from "../interfaces/General";

export function getRoles(req: Request, res: Response,next:NextFunction):Response  {
    const RolesArray:Array<RoleType> = getSmallerRoles(req.user["role"]);
    const DropDownRoles:Array<IDropDowns> = normalizeRolesForm(RolesArray);
    return res.status(200).json(DropDownRoles);
}
