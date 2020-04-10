import React from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";

const TableOrders: React.FC = () => {
const foods=[{name:'fatoush', quantity:2,price:1000},{name:'mutabal', quantity:3,price:2700},{name:'hummus', quantity:1,price:900}]
    return (
        <div className="table-order-container">
        <Paper className="products-paper">
            <div className="products-header">
                <h1>Table order</h1>
            </div>
            <TableOrderHeader/>
            <div>
            { foods.map((food:any, index:number)=> (
                <Grid key={index} container direction="row" justify="space-between">
                <Grid item container xs={4} justify="center">
                    <span>{food.name}</span>
                </Grid>
                <Grid item container xs={4} justify="center">
                    <span> {food.quantity}</span>
                </Grid>
                <Grid item container xs={4} justify="center">
                    <span>{food.price}</span>
                </Grid>
            </Grid>))}
            <div className="order-button-container">
                <Grid container direction="row" justify="space-between" >

                    <Grid item container justify="center" xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                         > delete </Button>
                     </Grid>
                    <Grid item container justify="center" xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                        > done </Button>
                    </Grid>
                    <Grid item container justify="center" xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                        > cancel </Button>
                    </Grid>

                    <Grid item container justify="center" xs={12} sm={6}>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                        > submit </Button>
                    </Grid>
                </Grid>

                </div>

            </div>
            </Paper>
        </div>
    );
};

export default TableOrders;