//Roles and their Hierarchy

export enum Roles {
    SuperAdmin = "SuperAdmin",
    Admin = 'Admin',
    Manager = 'Manager',
    Cashier = 'Cashier',
    Employee = 'Employee',
    Kitchen = 'Kitchen',
}

export type RoleType = 'SuperAdmin' | 'Admin' | 'Manager' | 'Cashier' | 'Employee' | 'Kitchen';

export const ROLES_ALL:Array<Roles> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager,Roles.Cashier,Roles.Employee,Roles.Kitchen];