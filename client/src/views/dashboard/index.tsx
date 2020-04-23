import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
const Dashboard:React.FC = () => {
    const {data, isLoading} = useFetch('/statistics/products/price');
    const tickFormat = data.map((item:any) => item.name);

    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Grid container direction='row'>
                    <Grid item xs={12} md={8} lg={5}>
                        <Paper>
                            <BarChart data={data} x='name' y='price' tickFormat={tickFormat}/>
                        </Paper>
                    </Grid>
                </Grid>
            </ComponentLoader>
        </>
    );
};

export default Dashboard;