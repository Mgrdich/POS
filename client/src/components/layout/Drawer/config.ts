import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {ComponentType} from "react";
import {IDrawerRoute} from "../../../interfaces/layout/Drawer";

export type nestedRoutes = {
    icon: ComponentType, //TODO to be removed since it is static
    location? : string,
    translation: string
}

export const drawerRoutes: Array<IDrawerRoute> = [
    {
        icon: PersonAddIcon,
        translation: "Add Users",
        nested: [
            {icon: FiberManualRecordIcon, location: "/create-user", translation: "Create User"},
        ]
    },
];