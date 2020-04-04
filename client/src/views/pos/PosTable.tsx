import React, {ChangeEvent} from 'react';
import {Box, Button, Grid, Paper, TextField} from "@material-ui/core";
import MenuCard from "../../components/Reusable/MenuCard";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import Products from "./Products";

const PosTable = () => {
    const products = ['Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads',];
    const productsList = [{id:1, name:"fatoush",price:1000}, {id:2, name:"summer",price:1000}, {id:3, name:"taboule",price:1200},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},];
    return (
        <div>
            <Grid container direction="row" justify="space-around" style={{paddingBottom:'80px'}}>
                <Grid item xs={12} sm={3}>
                    <TableOrders />
                </Grid>
                <Grid item xs={12} sm={8}>
                   <ProductsGroups products={products} />
                    <Products productsList={productsList}/>

                </Grid>
            </Grid>
        </div>
    );
};

export default PosTable;