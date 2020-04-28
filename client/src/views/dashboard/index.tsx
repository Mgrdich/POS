import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";
import InterpolationChart from "../../components/Reusable/Chart/InterpolationChart";
import {Paper} from "@material-ui/core";
import CardMessage from "../../components/Reusable/CardMessage";

const Dashboard: React.FC = () => {
    const {data: products, isLoading} = useFetch('/statistics/products/price');
    const {data: waiter} = useFetch('/statistics/orders/waiter');
    const {data: cashier} = useFetch('/statistics/orders/cashier');
    const productsTickFormat = products.length ? products.map((item: any) => item.name) : null;
    const productsData = products.length ? products.map((item: any) => {
        return {x: item.name, y: item.price}
    }) : null;
    const waiterTickFormat = waiter.length ? waiter.map((item: any) => item.waiter) : null;
    const cashierTickFormat = cashier.length ? cashier.map((item: any) => item.createdBy) : null;

    const BarChartColorScale = ['#66fcf1', '#1f2833'];
    const tickFormatFunction = (x: any) => {
        return `AMD${x / 1000}K`
    };
    const labelsFunction = (datum: any) => {
        return `price: ${datum}`
    };

    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} md={12} lg={6}>
                        {cashier.length && !isLoading ?
                            <Paper>
                                <BarChart
                                    colorScale={BarChartColorScale}
                                    data={cashier}
                                    x='createdBy'
                                    y='price'
                                    tickFormat={cashierTickFormat}
                                    labelsKey='price'
                                    tickFormatFunction={tickFormatFunction}
                                    labelsFunction={labelsFunction}
                                />
                            </Paper> : <CardMessage header='No data created!'/>}
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        {waiter.length && !isLoading ?
                            <Paper>
                                <HorizontalGroupChart
                                    data={waiter}
                                    x='waiter'
                                    y='price'
                                    tickFormat={waiterTickFormat}
                                    labelsKey='price'
                                    tickFormatFunction={tickFormatFunction}
                                    labelsFunction={labelsFunction}
                                />
                            </Paper> : <CardMessage header='No data created!'/>}
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                        {products.length && !isLoading ?
                            <Paper>
                                <InterpolationChart
                                    tickFormat={productsTickFormat}
                                    data={productsData}
                                    labelsKey='y'
                                    labelsFunction={labelsFunction}
                                    tickFormatFunction={tickFormatFunction}
                                    interpolation='linear'
                                />
                            </Paper>
                            : <CardMessage header='No data created!'/>}
                    </Grid>
                </Grid>
            </ComponentLoader>
        </>
    );
};

export default Dashboard;