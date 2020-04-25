import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import PieChart from "../../components/Reusable/Chart/PieChart";


const Dashboard:React.FC = () => {
    const {data, isLoading} = useFetch('/statistics/products/price');
    const tickFormat = data.length ?  data.map((item:any) => item.name) : null;
    const pieChartData = data.length ? data.map((item: any)=> {
        return{
            x: item.name,
            y: item.price,
        }
    }) : null;
    const colorScale = ['#1f2833', '#66fcf1', '#000000']

    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Grid container direction='row' justify='space-around'>
                    <Grid item container xs={12} md={8} lg={5}>
                        <Paper>
                            <BarChart data={data} x='name' y='price' tickFormat={tickFormat}/>
                        </Paper>
                    </Grid>
                    <Grid item container xs={12} md={8} lg={5}>
                        <Paper>
                            <PieChart data={pieChartData} x='y' colorScale={colorScale} chartName='Products'/>
                        </Paper>
                    </Grid>
                </Grid>
            </ComponentLoader>
        </>
    );
};

export default Dashboard;