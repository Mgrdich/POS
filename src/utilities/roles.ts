//Roles and their Hierarchy

import {IDropDowns} from "../interfaces/General";

export enum Roles {
    SuperAdmin = "SuperAdmin",
    Admin = 'Admin',
    Manager = 'Manager',
    Cashier = 'Cashier',
    Employee = 'Employee',
    Kitchen = 'Kitchen',
}

export type RoleType = 'SuperAdmin' | 'Admin' | 'Manager' | 'Cashier' | 'Employee' | 'Kitchen';

export const ROLES_ALL:Array<RoleType> = ['SuperAdmin','Admin','Manager','Cashier','Employee','Kitchen'];

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

type roleProperties = {
    [key in RoleType]: number;
};

export const ROLES_PRIORITY:roleProperties =  {
    SuperAdmin : 0,
    Admin : 1,
    Manager : 2,
    Cashier : 3,
    Employee : 4,
    Kitchen : 5,
};

export const ROLES_SUPER_ADMIN_MANAGER:Array<RoleType> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager];

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