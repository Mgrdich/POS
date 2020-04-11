import React, {useEffect, useState} from 'react';
import {Button, Grid, Paper,IconButton} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";
import {useSelector} from "react-redux";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


const TableOrders: React.FC = () => {
    const [ordersKeys, setOrdersKeys] = useState<Array<any>>([]);
    const nonSubmittedOrders: any = useSelector<any>(state => state.pos.nonSubmittedOrders);
    const productsGroupData: any = useSelector<any>(state => state.pos.productsGroups.data);

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

                {ordersKeys.map((key: string, index: number) => {
                    let productGroupId = nonSubmittedOrders[key].productsGroupId;
                    let product =  productsGroupData[productGroupId].products[key];
                    return (<Grid key={key} container direction="row" justify="space-between">
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>{product.name}</span>
                        </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>
                                <IconButton color="primary" ><RemoveIcon/></IconButton>
                                {nonSubmittedOrders[key].quantity}
                                <IconButton><AddIcon color="primary"/></IconButton>
                            </span>
                        </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>{product.price}</span>
                        </Grid>
                    </Grid>)})}
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
            </Paper>
        </div>
    );
};

export default TableOrders;