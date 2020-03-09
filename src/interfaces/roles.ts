import {Roles} from "../roles";

export type RoleType = Roles.SuperAdmin | Roles.Admin | Roles.Manager | Roles.Cashier | Roles.Employee | Roles.Kitchen;

export type roleProperties = {
    [key in RoleType]: number;
};
