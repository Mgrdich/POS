import {NextFunction, Request, Response} from "express";
import {RoleType} from "../interfaces/roles";
import {getSmallerRoles, normalizeRolesForm} from "../utilities/roles";
import {IDropDowns} from "../interfaces/General";
import {ProductsGroups} from "../models/ProductsGroups";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";

export function getRolesApi(req: Request, res: Response,next:NextFunction):Response  {
    const RolesArray:Array<RoleType> = getSmallerRoles(req.user["role"]);
    const DropDownRoles:Array<IDropDowns> = normalizeRolesForm(RolesArray);
    return res.status(200).json(DropDownRoles);
}

export async function getProductsGroupApi(req: Request, res: Response,next:NextFunction)  { //TODO add general utilizers normalizers
    const productsGroup:Array<IDocProductsGroups> = await ProductsGroups.find({});
}
