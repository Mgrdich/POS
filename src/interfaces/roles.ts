export type RoleType = 'SuperAdmin' | 'Admin' | 'Manager' | 'Cashier' | 'Employee' | 'Kitchen';

export type roleProperties = {
    [key in RoleType]: number;
};
