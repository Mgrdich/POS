import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {deleteGroupAction, finishTableOrders, submitTableOrders} from "../../actions/posActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DoneIcon from '@material-ui/icons/Done';
import Typography from "@material-ui/core/Typography";
import {useModal} from "../../components/Hooks/useModal";
import {isEmpty} from "../../util/functions";
import {useParams} from "react-router";


interface ITableOrdersButtons {
    disable:boolean;
}

const TableOrdersButtons : React.FC<ITableOrdersButtons>  = (props) => {
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const submittedOrders: any = useSelector<any>(state => state.pos.Orders);
    const dispatch = useDispatch();
    const [open, handleClickOpen, handleClose] = useModal();
    const {id} = useParams();


    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                type="button"
                startIcon={<DeleteIcon/>}
                onClick={() => dispatch(deleteGroupAction(ordersId))}
                disabled={props.disable}
            > delete </Button>
            <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => dispatch(submitTableOrders(ordersId))}
                disabled={props.disable}
                startIcon={<KeyboardArrowUpIcon/>}
            > submit </Button>
            <Button
                variant="outlined"
                color="primary"
                type="button"
                className="large-button"
                startIcon={<DoneIcon/>}
                disabled={!ordersId || isEmpty(submittedOrders[ordersId])}
                onClick={handleClickOpen}
            > Finish order </Button>

            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title"
                    fullWidth={true}>
                <DialogTitle id="finish-order">Finish Order</DialogTitle>
                <DialogContent>
                    <Typography component='p' color='primary'>
                        Are you sure you want to finish the order ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={() => handleClose()}
                    >Cancel
                    </Button>
                    <Button
                        color="primary"
                        disabled={!ordersId}
                        onClick={()=>dispatch(finishTableOrders(id))}
                    >Finish</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TableOrdersButtons;