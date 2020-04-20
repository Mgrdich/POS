import React, {useEffect, useState} from 'react';
import {isEmpty} from "../../util/functions";
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useScrollDown} from "../../components/Hooks/useScrollDown";

const SubmittedOrders = () => {
    const [submittedOrdersKeys, setSubmittedOrdersKeys] = useState<Array<any>>([]);
    const Orders:any = useSelector<any>(state => state.pos.Orders);
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const [listContainer] =  useScrollDown(submittedOrdersKeys);

    useEffect(function () {
        if (!isEmpty(Orders[ordersId])) {
            let SubOrderKeys = Object.keys(Orders[ordersId]);
            setSubmittedOrdersKeys(SubOrderKeys);
        }
    },[Orders,ordersId]);

    return (
        <div ref={listContainer}>
            {!isEmpty(Orders[ordersId]) && submittedOrdersKeys.length? submittedOrdersKeys.map((key: string) => {
                let product = Orders[ordersId][key];
                if(!product) {
                    return;
                }
                return (
                    <Grid key={key} container direction="row" justify="space-between" className="nonSubmitted">
                        <Grid item container xs={1} justify="center" alignContent="center">
                        </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>{product.name}</span>
                        </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>
                                {product.quantity}
                            </span>
                        </Grid>
                        <Grid item container xs={3} justify="center" alignContent="center">
                            <span>{product.price}</span>
                        </Grid>
                    </Grid>)
            }) : null}

        </div>
    );
};

export default SubmittedOrders;