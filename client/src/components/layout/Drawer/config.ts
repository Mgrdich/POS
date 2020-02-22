import MenuBookIcon from "@material-ui/icons/MenuBook";
import InfoIcon from "@material-ui/icons/Info";
import {ComponentType} from "react";

export type nestedRoutes = {
    icon: ComponentType, //TODO to be removed since it is static
    location? : string,
    translation: string
}

export interface IDrawerRoute {
    icon: ComponentType;
    location?: string;
    translation: string;
    nested?: Array<nestedRoutes>
}

export const drawerRoutes: Array<IDrawerRoute> = [
    {
        icon: MenuBookIcon,
        location: "/menu",
        translation: "Menu"
    },
    {
        icon: InfoIcon,
        location: "/about",
        translation: "About"
    },
    {
        icon: InfoIcon,
        translation: "Other",
        nested: [
            {icon: InfoIcon, location: "/home", translation: "Home"},
            {icon: InfoIcon, location: "/about", translation: "About"}
        ]
    },
    {
        icon: InfoIcon,
        translation: "Other1",
        nested: [
            {icon: InfoIcon, location: "/home", translation: "Home"},
            {icon: InfoIcon, location: "/contact", translation: "Contact"}
        ]
    }
];
