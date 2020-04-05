import React from 'react';
import {Grid} from "@material-ui/core";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import Products from "./Products";

const PosTable:React.FC = () => {
    const products = ['Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads',];
    const productsList = [{id:1, name:"fatoush",price:1000}, {id:2, name:"summer",price:1000}, {id:3, name:"taboule",price:1200},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},];
    
    return (
        <>
            <Grid container direction="row" justify="space-around" className="pos-grid">
                <Grid item xs={12} sm={3}>
                    <TableOrders />
                </Grid>
                <Grid item xs={12} sm={8}>
                   <ProductsGroups products={products} />
                   <Products productsList={productsList}/>
                </Grid>
            </Grid>
        </>
    );
};

export default PosTable;