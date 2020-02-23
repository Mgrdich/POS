import React from 'react';
import {Redirect, Route} from "react-router";
import {useSelector} from "react-redux";
import {IPublicRoute} from "../../../interfaces/HOC/Auth";




//Route is Accessible only when your not Authenticated Eg -> Login Page
const PublicRoute: React.FC<IPublicRoute> = ({component: Component, ...rest}) => {
    const isAuth = useSelector<any>(state => state.auth.isAuthenticated);

    return (
        <Route {...rest} render={(props) => (!isAuth) ?
            (<Component {...props}/>) :
            (
                <Redirect to="/404"/>
            )}
        />
    );
};

export default PublicRoute;