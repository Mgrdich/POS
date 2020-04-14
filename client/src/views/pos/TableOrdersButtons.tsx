import React from 'react';
import {Button} from "@material-ui/core";
import {deleteGroupAction, submitTableOrders} from "../../actions/posActions";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DoneIcon from '@material-ui/icons/Done';

interface ITableOrdersButtons {
    disable:boolean;
}

const TableOrdersButtons : React.FC<ITableOrdersButtons>  = (props) => {
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const dispatch = useDispatch();

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
                disabled={props.disable}
            > Finish order </Button>
        </>
    );
};

export default TableOrdersButtons;