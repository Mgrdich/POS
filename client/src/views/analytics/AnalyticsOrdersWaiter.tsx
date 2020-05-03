import React from 'react';
import Grid from "@material-ui/core/Grid";
import {DateRanges} from "../../constants/Enums/General";
import WaiterChart from "../dashboard/WaiterChart";

const AnalyticsOrdersWaiter = () => {
    return (
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={12} lg={6}>
                <WaiterChart
                    url="/statistics/orders/waiter"
                    query={`?date=${DateRanges.last_month}`}
                    defaultDateValue={DateRanges.last_month}
                />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <WaiterChart
                    url="/statistics/orders/waiter"
                    query={`?date=${DateRanges.this_month}`}
                    defaultDateValue={DateRanges.this_month}
                />
            </Grid>
        </Grid>
    );
};

export default AnalyticsOrdersWaiter;