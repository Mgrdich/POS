import GroupIcon from '@material-ui/icons/Group';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
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
import {Roles, RoleType} from "../../../roles";

export type nestedRoutes = {
    icon: ComponentType, //TODO to be removed since it is static
    location?: string,
    translation: string,
    role?: Array<RoleType>,
}

export const drawerRoutes: Array<IDrawerRoute> = [
    {
        icon: GroupIcon,
        translation: "Users",
        role: [Roles.SuperAdmin, Roles.Admin],
        nested: [
            {
                icon: ViewAgendaIcon,
                location: "/users",
                translation: "View users",
                role: [Roles.SuperAdmin, Roles.Admin],
            },
            {
                icon: PersonAddIcon,
                location: "/users/create-user",
                translation: "Create User",
                role: [Roles.SuperAdmin, Roles.Admin],
            },
        ]
    }, {
        icon: TableChartIcon,
        translation: "Tables",
        role: [Roles.SuperAdmin, Roles.Admin, Roles.Manager],
        nested: [
            {
                icon: CreateIcon,
                location: "/tables",
                translation: "Create tables",
                role: [Roles.SuperAdmin, Roles.Admin, Roles.Manager],
            },
            {
                icon: ViewAgendaIcon,
                location: "/tables/view-tables",
                translation: "Tables dashboard",
                role: [Roles.SuperAdmin, Roles.Admin, Roles.Manager],
            },
        ]
    }, {
        icon: InboxIcon,
        translation: "Products",
        role: [Roles.SuperAdmin, Roles.Admin],
        nested: [
            {
                icon: AddIcon,
                location: "/products",
                translation: "Products",
                role: [Roles.SuperAdmin, Roles.Admin],
            },
            {
                icon: GroupWorkIcon,
                location: "/products/products-group",
                translation: "Products group",
                role: [Roles.SuperAdmin, Roles.Admin],
            },


        ]
    },
    {
        icon:LocalAtmIcon,
        translation: "Pos",
        location:'/pos',
        role: [Roles.SuperAdmin, Roles.Admin, Roles.Manager],
    },

    {
        icon:ChatIcon,
        translation: "Chat",
        location:'/chat',
        role: [Roles.SuperAdmin, Roles.Admin],
    }

];