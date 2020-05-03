import React from 'react';
import CashierChart from "../dashboard/CashierChart";
import {DateRanges} from "../../constants/Enums/General";
import Grid from "@material-ui/core/Grid";

const AnalyticsOrdersCashier = () => {
    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={12} lg={6}>
                <CashierChart
                    url="/statistics/orders/cashier"
                    query={`?date=${DateRanges.last_month}`}
                    defaultDateValue={DateRanges.last_month}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <CashierChart
                    url="/statistics/orders/cashier"
                    query={`?date=${DateRanges.this_month}`}
                    defaultDateValue={DateRanges.this_month}
                />
            </Grid>
        </Grid>
    );
};

export default AnalyticsOrdersCashier;