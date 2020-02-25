import React from 'react';
import Login from "./components/auth/Login";
import {Switch} from "react-router";
import PublicRoute from "./components/HOC/Auth/PublicRoute";
import Register from "./components/auth/Register";

const Routes:React.FC = () => {
    return (
        <>
            <Switch>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
            </Switch>
        </>
    );
};

export default Routes;