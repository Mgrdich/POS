import React from 'react';
import Login from "./components/auth/Login";
import {Redirect, Route, Switch} from "react-router";
import PublicRoute from "./components/HOC/Auth/PublicRoute";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/HOC/Auth/PrivateRoute";
import Dashboard from "./views/dashboard";
import Error from "./views/errors/Error";
import HeaderFooterLayout from "./components/HOC/HeaderFooterLayout";
import CreateUsers from "./views/users/create-user/CreateUsers";
import Users from "./views/users";
import TablesDashboard from "./views/tables/viewTables";
import CreateEditTables from "./views/tables";
import AddProduct from "./views/products";
import {Roles, RoleType} from "./roles";
import Profile from "./views/profile";

const HL_Dashboard = HeaderFooterLayout(Dashboard);
const HL_CreateUser = HeaderFooterLayout(CreateUsers);
const HL_Users  = HeaderFooterLayout(Users);
const HL_Profile = HeaderFooterLayout(Profile);
const HL_TablesDashboard = HeaderFooterLayout(TablesDashboard);
const HL_CreateEditTables = HeaderFooterLayout(CreateEditTables);
const HL_AddProduct = HeaderFooterLayout(AddProduct);

const superAdminMangerRoles :Array<RoleType> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager];
const Routes:React.FC = () => {
    return (
        <>
            <Switch>
                <PrivateRoute exact path={['/','/dashboard']} component={HL_Dashboard}/>
                <PrivateRoute exact path={['/products','/product/index']} component={HL_AddProduct}/>
                <PrivateRoute exact path={'/tables/view-tables'} component={HL_TablesDashboard}/>
                <PrivateRoute exact path={['/tables','/tables/index']} component={HL_CreateEditTables}/>
                <PrivateRoute exact path='/users/create-user' allowedRoles={superAdminMangerRoles} component={HL_CreateUser}/>
                <PrivateRoute exact path='/users' allowedRoles={superAdminMangerRoles} component={HL_Users}/>
                <PrivateRoute exact path='/profile' component={HL_Profile}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <Route exact path="/404" render={(() =><Error errorNumber={404} errorText="Page Not Found"/> )}/>
                <Redirect to="/404"/>
            </Switch>
        </>
    );
};

export default Routes;