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
import ProductsGroup from "./views/products/products-group";
import {Roles, RoleType} from "./roles";
import Profile from "./views/profile";
import Pos from "./views/pos";
import PosTable from "./views/pos/PosTable";
import NoOrder from "./views/pos/NoOrder";
import Chat from "./views/chat";
import ReservedTables from "./views/tables/ReservedTables";
import LandingPage from "./views";

const HL_Dashboard = HeaderFooterLayout(Dashboard);
const HL_CreateUser = HeaderFooterLayout(CreateUsers);
const HL_Users  = HeaderFooterLayout(Users);
const HL_Profile = HeaderFooterLayout(Profile);
const HL_TablesDashboard = HeaderFooterLayout(TablesDashboard);
const HL_CreateEditTables = HeaderFooterLayout(CreateEditTables);
const HL_AddProduct = HeaderFooterLayout(AddProduct);
const HL_ProductsGroup = HeaderFooterLayout(ProductsGroup);
const HL_Chat = HeaderFooterLayout(Chat);
const HL_Pos= HeaderFooterLayout(Pos);
const HL_PosTable= HeaderFooterLayout(PosTable);
const HL_NoOrder= HeaderFooterLayout(NoOrder);
const HL_ReservedTables = HeaderFooterLayout(ReservedTables);
const HL_LandingPage = HeaderFooterLayout(LandingPage);

const superAdminMangerRoles :Array<RoleType> = [Roles.SuperAdmin,Roles.Admin,Roles.Manager];
const Routes:React.FC = () => {
    return (
        <>
            <Switch>
                <PrivateRoute exact path='/pos' allowedRoles={superAdminMangerRoles} component={HL_Pos}/>
                <PrivateRoute exact path='/pos/no-orders/:id' component={HL_NoOrder}/>
                <PrivateRoute exact path='/pos/:id' component={HL_PosTable}/>
                <PrivateRoute exact path='/dashboard'  allowedRoles={superAdminMangerRoles} component={HL_Dashboard}/>
                <PrivateRoute exact path={['/products','/product/index']} component={HL_AddProduct}/>
                <PrivateRoute exact path='/products/products-group' component={HL_ProductsGroup}/>
                <PrivateRoute exact path='/tables/view-tables' component={HL_TablesDashboard}/>
                <PrivateRoute exact path='/tables/reserved-tables' component={HL_ReservedTables}/>
                <PrivateRoute exact path={['/tables','/tables/index']} component={HL_CreateEditTables}/>
                <PrivateRoute exact path='/users/create-user' allowedRoles={superAdminMangerRoles} component={HL_CreateUser}/>
                <PrivateRoute exact path='/users' allowedRoles={superAdminMangerRoles} component={HL_Users}/>
                <PrivateRoute exact path='/profile' component={HL_Profile}/>
                <PrivateRoute exact path='/chat' component={HL_Chat}/>
                <PrivateRoute exact path='/' component={HL_LandingPage}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <Route exact path="/404" render={(() =><Error errorNumber={404} errorText="Page Not Found"/> )}/>
                <Redirect to="/404"/>
            </Switch>
        </>
    );
};

export default Routes;