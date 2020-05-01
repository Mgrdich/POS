import {ComponentType, ReactNode} from "react";
import {nestedRoutes} from "../../../components/layout/Drawer/config";
import {Roles} from "../../../roles";

export interface INestedMenuList {
    menuOpen:boolean;
}

export interface IMenuDrawer {
    children?:ReactNode;
}

export interface IDrawerRoute {
    icon: ComponentType;
    location?: string;
    translation: string;
    role?:Array<Roles>;
    nested?: Array<nestedRoutes>
}