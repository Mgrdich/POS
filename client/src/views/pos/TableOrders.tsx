import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import TableOrderHeader from "./TableOrderHeader";
import {useSelector} from "react-redux";
import {isEmpty} from "../../util/functions";
import TableOrdersButtons from "./TableOrdersButtons";
import SubmittedOrders from "./SubmittedOrders";
import NonSubmittedOrders from "./NonSubmittedOrders";

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
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const price:any = useSelector<any>(state => state.pos.price);

    useEffect(function () {
        if (!isEmpty(nonSubmittedOrders[ordersId])) {
            let nonSubOrderKeys = Object.keys(nonSubmittedOrders[ordersId]);
            setNonSubmittedOrdersKeys(nonSubOrderKeys);
        } else {
            setNonSubmittedOrdersKeys([]);
        }

    }, [nonSubmittedOrders,ordersId]);

    console.log(nonSubmittedOrdersKeys);
    return (
        <div className="table-order-container">
            <Paper className="products-paper">
                <div className="products-header">
                    <h1>Table order</h1>
                </div>
                <div className="table-add-orders-container">
                    <TableOrderHeader/>
                    <SubmittedOrders/>
                    <NonSubmittedOrders nonSubmittedOrdersKeys={nonSubmittedOrdersKeys}/>
                </div>
                <div className="order-button-container">
                    <div className="table-order-total-price">
                        <span> Total price : {price[ordersId] ? price[ordersId] : 0}</span>
                    </div>
                    <TableOrdersButtons disable={isEmpty(nonSubmittedOrdersKeys) || !ordersId}/>
                </div>
            </Paper>
        </div>
    );
};

export default TableOrders;