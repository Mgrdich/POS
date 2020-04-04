import {NextFunction, Request, Response} from "express";
import {RoleType} from "../interfaces/roles";
import {getSmallerRoles, normalizeRolesForm} from "../utilities/roles";
import {IDropDowns, myRequest} from "../interfaces/General";
import {ProductsGroups} from "../models/ProductsGroups";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";
import {normalizeDropDowns} from "../utilities/reformaters";
import {IDocUsers} from "../interfaces/models/Users";
import {Users} from "../models/Users";
import {errorCatcher} from "../utilities/controllers/error";
import {noResult} from "../utilities/controllers/helpers";

export function getRolesApi(req: Request, res: Response, next: NextFunction): Response {
    const RolesArray: Array<RoleType> = getSmallerRoles(req.user["role"]);
    const DropDownRoles: Array<IDropDowns> = normalizeRolesForm(RolesArray);
    return res.status(200).json(DropDownRoles);
}

export async function getProductsGroupApi(req: Request, res: Response, next: NextFunction) { //TODO add general utilizers normalizers
    const productsGroup: Array<IDocProductsGroups> = await ProductsGroups.find({}, {name: 1, _id: 1});
    const dropDownProductsGroup = [{
        value: '',
        placeholder: 'All'
    }];
    if (!productsGroup.length) {
        res.status(200).json(dropDownProductsGroup);
    }
    const propertiesMapping = {
        value: '_id',
        placeholder: 'name'
    };
    let dropDowns = normalizeDropDowns(productsGroup, propertiesMapping);
    res.status(200).json(dropDowns);

}

export async function getUsersApi(req: myRequest, res: Response, next: NextFunction) {
    try {
        const users: Array<IDocUsers> = await Users.find({/*"_id": {$ne: req.user._id}*/}, {name: 1, _id: 1});
        if (users.length) {
            const propertiesMapping = {
                value: '_id',
                placeholder: 'name'
            };
            let dropDowns = normalizeDropDowns(users, propertiesMapping);
            return res.status(200).json(dropDowns);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err)
    }

}
