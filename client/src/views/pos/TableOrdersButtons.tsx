import React, {useEffect} from 'react';
import {Button} from "@material-ui/core";
import {deleteGroupAction, fetchTableOrders, submitTableOrders} from "../../actions/posActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DoneIcon from '@material-ui/icons/Done';

const TableOrdersButtons : React.FC  = () => {
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const dispatch = useDispatch();

    useEffect(function () {
        dispatch(fetchTableOrders(ordersId));
    },[dispatch, ordersId]);
    return (
        <>
                <div className="order-button-container">
                    <div className="table-order-total-price">
                        <span> Total price = 5000</span>
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        startIcon={<DeleteIcon />}
                        onClick={()=>dispatch(deleteGroupAction(ordersId))}
                    > delete </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={()=>dispatch(submitTableOrders(ordersId))}
                        startIcon={<KeyboardArrowUpIcon />}
                    > submit </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        className="large-button"
                        startIcon={<DoneIcon />}
                    > Finish order </Button>
                </div>
        </>
    );
};

export default TableOrdersButtons;