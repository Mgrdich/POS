import React from 'react';
import {RouteProps} from "react-router";
import {RoleType} from "../../../roles";

export interface IIsAuth {
    ElementWithAuth?: React.ReactNode;
    ElementNoAuth?: any;
}

export interface IAuthorizationElem {
    allowedRoles?: Array<RoleType>;
    children?: React.ReactNode;
}


export interface IPrivateRoute extends RouteProps {
    component: React.ComponentType<any>;
    allowedRoles?: Array<RoleType>;
}

export interface IPublicRoute extends RouteProps {
    component: React.ComponentType<any>;
}


