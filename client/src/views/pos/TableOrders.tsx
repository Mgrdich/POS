import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";
import {useSelector} from "react-redux";

const TableOrders: React.FC = () => {
    const [ordersKeys, setOrdersKeys] = useState<Array<any>>([]);
    const nonSubmittedOrders: any = useSelector<any>(state => state.pos.nonSubmittedOrders);
    const products: any = useSelector<any>(state => state.pos.products.data);

    useEffect(function () {
        if (nonSubmittedOrders) {
            let nonSubOrderKeys = Object.keys(nonSubmittedOrders);
            setOrdersKeys(nonSubOrderKeys);
        }
    }, [nonSubmittedOrders]);

    return (
        <div className="table-order-container">
            <Paper className="products-paper">
                <div className="products-header">
                    <h1>Table order</h1>
                </div>
                <TableOrderHeader/>
                <div>
                    {ordersKeys.map((key: string, index: number) => (
                        <Grid key={key} container direction="row" justify="space-between">
                            <Grid item container xs={4} justify="center">
                                <span>{products[key].name}</span>
                            </Grid>
                            <Grid item container xs={4} justify="center">
                                <span> {nonSubmittedOrders[key].quantity}</span>
                            </Grid>
                            <Grid item container xs={4} justify="center">
                                <span>{products[key].price}</span>
                            </Grid>
                        </Grid>))}
                    <div className="order-button-container">
                        <Grid container direction="row" justify="space-between">

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