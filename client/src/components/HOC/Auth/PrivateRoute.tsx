import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, RouteComponentProps} from "react-router";
import {IPrivateRoute} from "../../../interfaces/HOC/Auth";
import {RoleType} from "../../../roles";

//Route is Accessible only when your Authenticated and have the permissions
const PrivateRoute: React.FC<IPrivateRoute> = ({component: Component, allowedRoles, ...rest}) => {
    const isAuth:unknown = useSelector<any>(state => state.auth.isAuthenticated);
    const role:unknown = useSelector<any>(state => state.auth.user.role);

    const routePermission: boolean = (allowedRoles) ? (isAuth && allowedRoles.includes(role as RoleType)) : !!isAuth;

    return (
        <Route {...rest} render={(props:RouteComponentProps) => (routePermission) ?
            (<Component {...props}/>) :
            (
                <Redirect to="/login"/>
            )}
        />
    );
};

export default PrivateRoute;