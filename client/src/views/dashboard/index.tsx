import React from 'react';
import BarChart from "../../components/Reusable/Chart/BarChart";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "../../components/Hooks/useFetch";
import {Paper} from "@material-ui/core";
const Dashboard:React.FC = () => {
    const {data, isLoading} = useFetch('/statistics/products/price');
    const tickFormat = data.map((item:any) => item.name);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> :
                <Grid container>
                    <Grid  item xs={12} md={5}>
                        <Paper>
                            <BarChart data={data} x='name' y='price' tickFormat={tickFormat}/>
                        </Paper>
                    </Grid>
                </Grid>}
        </>
    );
};

export default Dashboard;