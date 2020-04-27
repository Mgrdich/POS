import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import HorizontalGroupChart from "../../components/Reusable/Chart/HorizontalGroupChart";


const Dashboard:React.FC = () => {
    const {data, isLoading} = useFetch('/statistics/products/price');
    const {data:data1} = useFetch('/statistics/orders/waiter');
    const tickFormat = data.length ?  data.map((item:any) => item.name) : null;
    const waiterTickFormat = data1.length ?  data1.map((item:any) => item.waiter) : null;
    const BarChartColorScale = ['#66fcf1', '#1f2833'];
    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Grid container spacing={1} alignItems='center'>
                    <Grid item xs={12} md={12} lg={6}>
                            <BarChart colorScale={BarChartColorScale} data={data} x='name' y='price' tickFormat={tickFormat} labelsKey='price'/>
                    </Grid>
                    <Grid item xs={12} md={12} lg={6}>
                            <HorizontalGroupChart data={data1} x='waiter' y='price' tickFormat={waiterTickFormat}/>
                    </Grid>
                </Grid>
            </ComponentLoader>
        </>
    );
};

export default Dashboard;