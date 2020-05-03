import React from 'react';
import Grid from "@material-ui/core/Grid";
import {DateRanges} from "../../constants/Enums/General";
import ProductsChart from "../dashboard/ProductsChart";

const AnalyticsProductsPrice = () => {
    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={12} lg={6}>
                <ProductsChart
                    url="/statistics/products/price"
                    query={`?date=${DateRanges.last_month}`}
                    defaultDateValue={DateRanges.last_month}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <ProductsChart
                    url="/statistics/products/price"
                    query={`?date=${DateRanges.this_month}`}
                    defaultDateValue={DateRanges.this_month}
                />
            </Grid>
        </Grid>
    );
};

export default AnalyticsProductsPrice;