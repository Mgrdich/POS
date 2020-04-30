import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";
import InterpolationChart from "../../components/Reusable/Chart/InterpolationChart";
import {Paper} from "@material-ui/core";
import CardMessage from "../../components/Reusable/CardMessage";
import ControlledDropDown from "../../components/Reusable/ControlledDropDown";
import {dateRanges} from "../../constants/dropdown/dateRanges";

const Dashboard: React.FC = () => {
    const {data: products, isLoading} = useFetch('/statistics/products/price');
    const {data: waiter, isLoading: waterIsLoading} = useFetch('/statistics/orders/waiter');
    const {data: cashier, isLoading: cashierIsLoading} = useFetch('/statistics/orders/cashier');
    const {data: tables, isLoading: tablesIsLoading} = useFetch('statistics/orders/table');

    const tablesData = tables.length ? tables.map((item: any) => {
        return {x: item.number, y: item.price}
    }) : null;
    const productsData = products.length ? products.map((item: any) => {
        return {x: item.name, y: item.price}
    }) : null;
    const productsTickFormat = products.length ? products.map((item: any) => item.name) : null;
    const waiterTickFormat = waiter.length ? waiter.map((item: any) => item.waiter) : null;
    const cashierTickFormat = cashier.length ? cashier.map((item: any) => item.createdBy) : null;
    const tablesTickFormat = tables.length ? tables.map((item: any) => item.number) : null;

    const BarChartColorScale = ['#66fcf1', '#1f2833'];
    const tickFormatFunction = (x: any) => {
        return `AMD${x / 1000}K`
    };
    const labelsFunction = (datum: any) => {
        return `price: ${datum}`
    };

    const handleOnChange = (value: string) => {
        console.log(value)
    }
    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} md={12} lg={6}>
                        {cashier.length && !cashierIsLoading ?
                            <Paper>
                                <div className="chart-dropdown-container">
                                    <ControlledDropDown
                                        id='cashierDateRange'
                                        name='cashier-date-range'
                                        size='small'
                                        ignoreNone={true}
                                        data={dateRanges}
                                        label='select date range'
                                        handleOnChange={handleOnChange}
                                    />
                                </div>
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
                        {waiter.length && !waterIsLoading ?
                            <Paper>
                                <div className="chart-dropdown-container">
                                    <ControlledDropDown
                                        id='waiterDateRange'
                                        name='waiter-date-range'
                                        size='small'
                                        ignoreNone={true}
                                        data={dateRanges}
                                        label='select date range'
                                        handleOnChange={handleOnChange}
                                    />
                                </div>
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
                                <div className="chart-dropdown-container">
                                    <ControlledDropDown
                                        id='productsDateRange'
                                        name='products-date-range'
                                        size='small'
                                        ignoreNone={true}
                                        data={dateRanges}
                                        label='select date range'
                                        handleOnChange={handleOnChange}
                                    />
                                </div>
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
                    <Grid item xs={12} md={12} lg={6}>
                        {tables.length && !tablesIsLoading ?
                            <Paper>
                                <div className="chart-dropdown-container">
                                    <ControlledDropDown
                                        id='tablesDateRange'
                                        name='tables-date-range'
                                        size='small'
                                        ignoreNone={true}
                                        data={dateRanges}
                                        label='select date range'
                                        handleOnChange={handleOnChange}
                                    />
                                </div>
                                <InterpolationChart
                                    tickFormat={tablesTickFormat}
                                    data={tablesData}
                                    labelsKey='y'
                                    labelsFunction={labelsFunction}
                                    tickFormatFunction={tickFormatFunction}
                                    interpolation='cardinal'
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