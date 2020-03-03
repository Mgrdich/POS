//Roles and their Hierarchy
import {IDropDowns} from "../interfaces/General";
import {RoleType} from "../interfaces/roles";
import {Roles} from "../roles";

//transform Roles into DropDownForm
export function normalizeRolesForm(roles:Array<RoleType>) {
    return roles.map(function (item:RoleType) {
        let obj: IDropDowns = {
            placeholder: item,
            value: item
        };
        return obj;
    });
}

export function getSmallerRoles(myRoles:RoleType):Array<RoleType> {
    switch (myRoles) {
        case Roles.SuperAdmin:
            return [Roles.Admin, Roles.Manager, Roles.Cashier, Roles.Employee,Roles.Kitchen];
        case Roles.Admin:
            return [Roles.Manager, Roles.Cashier, Roles.Employee,Roles.Kitchen];
        case Roles.Manager:
            return [Roles.Cashier, Roles.Employee,Roles.Kitchen];
        case Roles.Cashier:
            return [Roles.Employee,Roles.Kitchen];
        case Roles.Employee:
            return [Roles.Employee];
        case Roles.Kitchen:
            return [Roles.Kitchen];
    }
}