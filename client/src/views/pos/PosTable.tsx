import React from 'react';
import {Grid} from "@material-ui/core";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import {useSelector} from "react-redux";
import ErrorHandler from "../errors/ErrorHandler";
import Products from "./Products";

const PosTable: React.FC = () => {
    const error = useSelector<any>(state => state.pos.error);

    return (
        <ErrorHandler error={error as boolean}>
            <Grid container direction="row" justify="space-around" className="pos-container">
                <Grid item xs={12} sm={3} className="pos-grid">
                    <TableOrders/>
                </Grid>
                <Grid item xs={12} sm={8} className="pos-grid">
                    <ProductsGroups/>
                    <Products/>
                </Grid>
            </Grid>
        </ErrorHandler>
    );
};

export default PosTable;