//Roles and their Hierarchy

export enum Roles {
    SuperAdmin = "SuperAdmin",
    Admin = 'Admin',
    Manager = 'Manager',
    Cashier = 'Cashier',
    Employee = 'Employee',
    Kitchen = 'Kitchen',
}

export const ROLES_ALL:Array<Roles> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager,Roles.Cashier,Roles.Employee,Roles.Kitchen];

export const SUPER_ADMIN_ADMIN_ROLES:Array<Roles> = [Roles.SuperAdmin,Roles.Admin];
export const SUPER_ADMIN_MANAGER_ROLES:Array<Roles> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager];
export const SUPER_ADMIN_MANAGER_CASHIER_ROLES:Array<Roles> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager,Roles.Cashier];
