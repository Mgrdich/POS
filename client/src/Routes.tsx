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
import CreateEditTables from "./views/tables";
import AddProduct from "./views/products";
import ProductsGroup from "./views/products/products-group";
import {
    SUPER_ADMIN_ADMIN_ROLES,
    SUPER_ADMIN_MANAGER_CASHIER_ROLES,
    SUPER_ADMIN_MANAGER_ROLES
} from "./roles";
import Profile from "./views/profile";
import Pos from "./views/pos";
import PosTable from "./views/pos/PosTable";
import NoOrder from "./views/pos/NoOrder";
import Chat from "./views/chat";
import ReservedTables from "./views/tables/ReservedTables";
import LandingPage from "./views";
import AnalyticsOrdersCashier from "./views/analytics/AnalyticsOrdersCashier";
import AnalyticsOrdersTables from "./views/analytics/AnalyticsOrdersTables";
import AnalyticsOrdersWaiter from "./views/analytics/AnalyticsOrdersWaiter";
import AnalyticsProductsPrice from "./views/analytics/AnalyticsProductsPrice";

const HL_Dashboard = HeaderFooterLayout(Dashboard);
const HL_CreateUser = HeaderFooterLayout(CreateUsers);
const HL_Profile = HeaderFooterLayout(Profile);
const HL_CreateEditTables = HeaderFooterLayout(CreateEditTables);
const HL_AddProduct = HeaderFooterLayout(AddProduct);
const HL_ProductsGroup = HeaderFooterLayout(ProductsGroup);
const HL_Chat = HeaderFooterLayout(Chat);
const HL_POS= HeaderFooterLayout(Pos);
const HL_POSTable= HeaderFooterLayout(PosTable);
const HL_NoOrder= HeaderFooterLayout(NoOrder);
const HL_ReservedTables = HeaderFooterLayout(ReservedTables);
const HL_LandingPage = HeaderFooterLayout(LandingPage);
const HL_AnalyticsOrdersCashier = HeaderFooterLayout(AnalyticsOrdersCashier);
const HL_AnalyticsOrdersTables = HeaderFooterLayout(AnalyticsOrdersTables);
const HL_AnalyticsOrdersWaiter = HeaderFooterLayout(AnalyticsOrdersWaiter);
const HL_AnalyticsProductsPrice = HeaderFooterLayout(AnalyticsProductsPrice);

const Routes:React.FC = () => {
    return (
            <Switch>
                <PrivateRoute exact path='/pos' allowedRoles={SUPER_ADMIN_MANAGER_CASHIER_ROLES} component={HL_POS}/>
                <PrivateRoute exact path='/pos/no-orders/:id' allowedRoles={SUPER_ADMIN_MANAGER_CASHIER_ROLES} component={HL_NoOrder}/>
                <PrivateRoute exact path='/pos/:id' allowedRoles={SUPER_ADMIN_MANAGER_CASHIER_ROLES} component={HL_POSTable}/>
                <PrivateRoute exact path='/dashboard'  allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_Dashboard}/>
                <PrivateRoute exact path={['/products','/product/index']} allowedRoles={SUPER_ADMIN_MANAGER_ROLES} component={HL_AddProduct}/>
                <PrivateRoute exact path='/products/products-group' allowedRoles={SUPER_ADMIN_MANAGER_ROLES} component={HL_ProductsGroup}/>
                <PrivateRoute exact path='/tables/reserved-tables' allowedRoles={SUPER_ADMIN_MANAGER_ROLES} component={HL_ReservedTables}/>
                <PrivateRoute exact path={['/tables','/tables/index']} allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_CreateEditTables}/>
                <PrivateRoute exact path='/users/create-user' allowedRoles={SUPER_ADMIN_MANAGER_ROLES} component={HL_CreateUser}/>
                <PrivateRoute exact path={['/analytics','/analytics/orders-cashier']} allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_AnalyticsOrdersCashier}/>
                <PrivateRoute exact path='/analytics/orders-waiter' allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_AnalyticsOrdersWaiter}/>
                <PrivateRoute exact path='/analytics/products-price' allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_AnalyticsProductsPrice}/>
                <PrivateRoute exact path='/analytics/orders-table' allowedRoles={SUPER_ADMIN_ADMIN_ROLES} component={HL_AnalyticsOrdersTables}/>
                <PrivateRoute exact path='/profile' component={HL_Profile}/>
                <PrivateRoute exact path='/chat' component={HL_Chat}/>
                <PrivateRoute exact path='/' component={HL_LandingPage}/>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <Route exact path="/404" render={(() =><Error errorNumber={404} errorText="Page Not Found"/> )}/>
                <Redirect to="/404"/>
            </Switch>
    );
};

export default Routes;