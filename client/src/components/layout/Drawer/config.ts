import GroupIcon from '@material-ui/icons/Group';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {ComponentType} from "react";
import {IDrawerRoute} from "../../../interfaces/layout/Drawer";
import {Roles, RoleType} from "../../../roles";

export type nestedRoutes = {
    icon: ComponentType, //TODO to be removed since it is static
    location? : string,
    translation: string,
    role?:Array<RoleType>,
}

export const drawerRoutes: Array<IDrawerRoute> = [
    {
        icon: GroupIcon,
        translation: "Users",
        role:[Roles.SuperAdmin,Roles.Admin],
        nested: [
            {icon: ViewAgendaIcon, location: "/users", translation: "View users",role:[Roles.SuperAdmin,Roles.Admin],},
            {icon: PersonAddIcon, location: "/users/create-user", translation: "Create User",role:[Roles.SuperAdmin,Roles.Admin],},
        ]
    },

];