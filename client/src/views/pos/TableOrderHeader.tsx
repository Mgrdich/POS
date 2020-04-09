import React from 'react';
import {Grid} from "@material-ui/core";

const TableOrderHeader: React.FC = () => {
    return (
        <Grid container direction="row" justify="space-between">
            <Grid item container xs={12} sm={12} md={4} justify="center">
                <span> Name</span>
            </Grid>
            <Grid item container xs={12} sm={12} md={4} justify="center">
                <span> Quantity</span>
            </Grid>
            <Grid item container xs={12} sm={12} md={4} justify="center">
                <span> Price</span>
            </Grid>
        </Grid>
    );
};

export default TableOrderHeader;