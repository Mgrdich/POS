import React from 'react';
import {RouteProps} from "react-router";

export interface IIsAuth {
    ElementWithAuth?: React.ReactNode;
    ElementNoAuth?: any;
}

export interface IAuthorizationElem {
    allowedRoles?: Array<string>;
    children?: React.ReactNode;
}


export interface IPrivateRoute extends RouteProps {
    component: React.ComponentType<any>;
    allowedRoles?: Array<string>;
}

export interface IPublicRoute extends RouteProps {
    component: React.ComponentType<any>;
}


