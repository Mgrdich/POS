import React from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {IHeaderFooterLayout} from "../../interfaces/HOC";


const HeaderFooterLayout: React.FC<IHeaderFooterLayout> = (props) => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    );
};

export default HeaderFooterLayout;