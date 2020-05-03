import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TableChartIcon from '@material-ui/icons/TableChart';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import InboxIcon from '@material-ui/icons/Inbox';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ChatIcon from '@material-ui/icons/Chat';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import {ComponentType} from "react";
import {IDrawerRoute} from "../../../interfaces/layout/Drawer";
import {
    Roles,
    ROLES_ALL,
    SUPER_ADMIN_ADMIN_ROLES,
    SUPER_ADMIN_MANAGER_CASHIER_ROLES,
    SUPER_ADMIN_MANAGER_ROLES
} from "../../../roles";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export type nestedRoutes = {
    icon: ComponentType, //TODO to be removed since it is static
    location?: string,
    translation: string,
    role?: Array<Roles>,
}

export const drawerRoutes: Array<IDrawerRoute> = [
    {
        icon: EqualizerIcon,
        translation: "Dashboard",
        location:'/dashboard',
        role: SUPER_ADMIN_MANAGER_ROLES,
    },
    {
        icon: PersonAddIcon,
        location: "/users/create-user",
        translation: "Users",
        role: SUPER_ADMIN_ADMIN_ROLES,
    },
    {
        icon: AssessmentIcon,
        translation: "Analytics",
        role: SUPER_ADMIN_MANAGER_ROLES,
        nested: [
            {
                icon: FiberManualRecordIcon,
                location: "/analytics/orders-cashier",
                translation: "Orders cashier",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
            {
                icon: FiberManualRecordIcon,
                location: "/analytics/orders-table",
                translation: "Orders table",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
            {
                icon: FiberManualRecordIcon,
                location: "/analytics/orders-waiter",
                translation: "Orders waiter",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
            {
                icon: FiberManualRecordIcon,
                location: "/analytics/products-price",
                translation: "Products price",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
        ],
    },
    {
        icon: TableChartIcon,
        translation: "Tables",
        role: SUPER_ADMIN_MANAGER_ROLES,
        nested: [
            {
                icon: CreateIcon,
                location: "/tables",
                translation: "Create tables",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
            {
                icon: RestaurantIcon,
                location: "/tables/reserved-tables",
                translation: "Reserved tables",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
        ]
    }, {
        icon: InboxIcon,
        translation: "Products",
        role: SUPER_ADMIN_MANAGER_ROLES,
        nested: [
            {
                icon: AddIcon,
                location: "/products",
                translation: "Products",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },
            {
                icon: GroupWorkIcon,
                location: "/products/products-group",
                translation: "Products group",
                role: SUPER_ADMIN_MANAGER_ROLES,
            },


        ]
    },
    {
        icon: LocalAtmIcon,
        translation: "Pos",
        location:'/pos',
        role: SUPER_ADMIN_MANAGER_CASHIER_ROLES,
    },

    {
        icon: ChatIcon,
        translation: "Chat",
        location:'/chat',
        role:ROLES_ALL
    },
];