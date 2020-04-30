import React from 'react';
import Grid from "@material-ui/core/Grid";
import CashierChart from "./CashierChart";
import WaiterChart from "./WaiterChart";
import ProductsChart from "./ProductsChart";
import TablesChart from "./TablesChart";




const Dashboard: React.FC = () => {

    return (
        <>

            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} md={12} lg={6}>
                    <CashierChart/>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <WaiterChart/>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <ProductsChart/>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                    <TablesChart/>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;