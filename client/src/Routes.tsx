import React from 'react';
import MenuDrawer from "./components/layout/Drawer/MenuDrawer";
import {BrowserRouter} from "react-router-dom";

const Routes:React.FC = () => {
    return (
        <>
            <BrowserRouter >
        <MenuDrawer/>
            </BrowserRouter>
        </>
    );
};

export default Routes;