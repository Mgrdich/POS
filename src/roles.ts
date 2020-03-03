import {roleProperties, RoleType} from "./interfaces/roles";

export enum Roles {
    SuperAdmin = "SuperAdmin",
    Admin = 'Admin',
    Manager = 'Manager',
    Cashier = 'Cashier',
    Employee = 'Employee',
    Kitchen = 'Kitchen',
}

export const ROLES_ALL:Array<RoleType> = ['SuperAdmin','Admin','Manager','Cashier','Employee','Kitchen'];

export const ROLES_PRIORITY:roleProperties =  {
    SuperAdmin : 0,
    Admin : -1,
    Manager : -2,
    Cashier : -3,
    Employee : -4,
    Kitchen : -5,
};

//Roles with its Arrays
export const ROLES_SUPER_ADMIN_MANAGER:Array<RoleType> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager];