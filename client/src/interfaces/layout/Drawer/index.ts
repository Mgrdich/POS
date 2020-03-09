import {ComponentType, ElementType, ReactNode} from "react";
import {nestedRoutes} from "../../../components/layout/Drawer/config";
import {RoleType} from "../../../roles";

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
    role?:Array<RoleType>;
    nested?: Array<nestedRoutes>
}