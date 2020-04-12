import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Checkbox, Grid, IconButton, Paper} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";
import {useDispatch, useSelector} from "react-redux";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {isEmpty} from "../../util/functions";
import {setGroupAction, submitTableOrders} from "../../actions/posActions";

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
    const [submittedOrdersKeys, setSubmittedOrdersKeys] = useState<Array<any>>([]);
    const nonSubmittedOrders: any = useSelector<any>(state => state.pos.nonSubmittedOrders);
    const productsGroupData: any = useSelector<any>(state => state.pos.productsGroups.data);
    const checkedGroupActions:any = useSelector<any>(state => state.pos.groupActions);
    const Orders:any = useSelector<any>(state => state.pos.Orders);
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const dispatch = useDispatch();

    useEffect(function () {
        if (!isEmpty(nonSubmittedOrders[ordersId])) {
            let nonSubOrderKeys = Object.keys(nonSubmittedOrders[ordersId]);
            setNonSubmittedOrdersKeys(nonSubOrderKeys);
        }
    }, [nonSubmittedOrders,ordersId]);

    useEffect(function () {
        if (!isEmpty(Orders[ordersId])) {
            let SubOrderKeys = Object.keys(Orders[ordersId]);
            setSubmittedOrdersKeys(SubOrderKeys);
        }
    },[Orders,ordersId]);

    return (
        <div className="table-order-container">
            <Paper className="products-paper">
                <div className="products-header">
                    <h1>Table order</h1>
                </div>
                <TableOrderHeader/>
                {!isEmpty(Orders[ordersId]) && submittedOrdersKeys.length && ordersId? submittedOrdersKeys.map((key: string) => {
                    let productGroupId = Orders[ordersId][key].productsGroupId;
                    let product = productsGroupData[productGroupId].products[key];
                    return (
                        <Grid key={key} container direction="row" justify="space-between" className="nonSubmitted">
                            <Grid item container xs={1} justify="center" alignContent="center">
                            </Grid>
                            <Grid item container xs={4} justify="center" alignContent="center">
                                <span>{product.name}</span>
                            </Grid>
                            <Grid item container xs={4} justify="center">
                            <span>
                                {Orders[ordersId][key].quantity}
                            </span>
                            </Grid>
                            <Grid item container xs={3} justify="center" alignContent="center">
                                <span>{product.price}</span>
                            </Grid>
                        </Grid>)
                }) : null}


                {!isEmpty(nonSubmittedOrders[ordersId]) && nonSubmittedOrdersKeys.length && ordersId? nonSubmittedOrdersKeys.map((key: string) => {
                    let productGroupId = nonSubmittedOrders[ordersId][key].productsGroupId;
                    let product = productsGroupData[productGroupId].products[key];
                    return (
                        <Grid key={key} container direction="row" justify="space-between" className="nonSubmitted">
                            <Grid item container xs={1} justify="center" alignContent="center">
                                <Checkbox
                                    checked={!!checkedGroupActions[ordersId][key]}
                                    color="primary"
                                    inputProps={{'aria-label': 'secondary checkbox'}}
                                    size="small"
                                    onChange={(event:ChangeEvent<HTMLInputElement>)=>dispatch(setGroupAction(ordersId,key,event.target.checked))}
                                />
                            </Grid>
                            <Grid item container xs={4} justify="center" alignContent="center">
                                <span>{product.name}</span>
                            </Grid>
                            <Grid item container xs={4} justify="center">
                            <span>
                                <IconButton color="primary"><RemoveIcon/></IconButton>
                                {nonSubmittedOrders[ordersId][key].quantity}
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
                        onClick={()=>dispatch(submitTableOrders(ordersId))}
                    > submit </Button>
                </div>
            </Paper>
        </div>
    );
};

export default TableOrders;