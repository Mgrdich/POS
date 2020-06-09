import React from 'react';
import Grid from "@material-ui/core/Grid";
import CashierChart from "./CashierChart";
import WaiterChart from "./WaiterChart";
import ProductsChart from "./ProductsChart";
import TablesChart from "./TablesChart";


const Dashboard: React.FC = () => { //TODO maybe merge the charts into one giant  component with switch
    return ( //TODO After BE returns exact data format
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={12} lg={6}>
                <CashierChart url="/statistics/orders/cashier"/>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <WaiterChart url="/statistics/orders/waiter"/>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <ProductsChart url="/statistics/products/price"/>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <TablesChart url="statistics/orders/table"/>
            </Grid>
        </Grid>
    );
};

export default Dashboard;