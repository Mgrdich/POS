import React, {useEffect, useState} from 'react';
import {Button, Grid, IconButton, Paper, Checkbox} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";
import {useSelector} from "react-redux";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {useParams} from "react-router";
import {isEmpty} from "../../util/functions";

/*
function renderProduct(id:string,name:string,quantity:number,price:number):JSX.Element {
    return (
        <Grid key={id} container direction="row" justify="space-between" className="nonSubmitted">
            <Grid item container xs={4} justify="center">
                <span>{name}</span>
            </Grid>
            <Grid item container xs={4} justify="center">
                <span> {quantity}</span>
            </Grid>
            <Grid item container xs={4} justify="center">
                <span>{price}</span>
            </Grid>
        </Grid>
    )
}
*/

const TableOrders: React.FC = () => {
    const [nonSubmittedOrdersKeys, setNonSubmittedOrdersKeys] = useState<Array<any>>([]);
    const nonSubmittedOrders: any = useSelector<any>(state => state.pos.nonSubmittedOrders);
    const productsGroupData: any = useSelector<any>(state => state.pos.productsGroups.data);
    const tableHashed:any = useSelector<any>(state => state.pos.tableHashed);
    const {id: id} = useParams<{id:string}>();

    useEffect(function () {
        if (nonSubmittedOrders && tableHashed && id && !isEmpty(nonSubmittedOrders[tableHashed[id]])) {
            let nonSubOrderKeys = Object.keys(nonSubmittedOrders[tableHashed[id]]);
            setNonSubmittedOrdersKeys(nonSubOrderKeys);
        }
    }, [nonSubmittedOrders,tableHashed,id]);

    return (
        <div className="table-order-container">
            <Paper className="products-paper">
                <div className="products-header">
                    <h1>Table order</h1>
                </div>
                <TableOrderHeader/>

                {nonSubmittedOrdersKeys.length && id? nonSubmittedOrdersKeys.map((key: string) => {
                    let productGroupId = nonSubmittedOrders[tableHashed[id]][key].productsGroupId;
                    let product = productsGroupData[productGroupId].products[key];
                    return (<Grid key={key} container direction="row" justify="space-between" className="nonSubmitted">
                    <Grid item container xs={1} justify="center" alignContent="center">
                        <Checkbox
                            defaultChecked
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                            </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>{product.name}</span>
                        </Grid>
                        <Grid item container xs={4} justify="center">
                            <span>
                                <IconButton color="primary" ><RemoveIcon/></IconButton>
                                {nonSubmittedOrders[tableHashed[id]][key].quantity}
                                <IconButton><AddIcon color="primary"/></IconButton>
                            </span>
                        </Grid>
                        <Grid item container xs={3} justify="center" alignContent="center">
                            <span>{product.price}</span>
                        </Grid>
                    </Grid>)
                }) : null}
                <div className="order-button-container">
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                    > delete </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                    > done </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                    > cancel </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                    > submit </Button>
                </div>
            </Paper>
        </div>
    );
};

export default TableOrders;