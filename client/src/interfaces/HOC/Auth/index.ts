import React from 'react';
import {RouteProps} from "react-router";
import {Roles} from "../../../roles";

export interface IIsAuth {
    ElementWithAuth?: React.ReactNode;
    ElementNoAuth?: any;
}

export interface IAuthorizationElem {
    allowedRoles?: Array<Roles>;
    children?: React.ReactNode;
}


export interface IPrivateRoute extends RouteProps {
    component: React.ComponentType<any>;
    allowedRoles?: Array<Roles>;
}

export interface IPublicRoute extends RouteProps {
    component: React.ComponentType<any>;
}


