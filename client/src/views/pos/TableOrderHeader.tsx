import React, {ChangeEvent} from 'react';
import {Checkbox, Grid} from "@material-ui/core";
import {setAllGroupActions} from "../../actions/posActions";
import {useDispatch, useSelector} from "react-redux";

const TableOrderHeader: React.FC = () => {
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const dispatch = useDispatch();

    return (
        <Grid container direction="row" justify="space-between">
            <Grid item container xs={1} justify="center">
                <Checkbox
                    defaultChecked
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                    size="small"
                    onChange={(event:ChangeEvent<HTMLInputElement>)=>dispatch(setAllGroupActions(ordersId,event.target.checked))}
                />

            </Grid>
            <Grid item container xs={4} justify="center">
                <span> Name</span>
            </Grid>
            <Grid item container xs={4} justify="center">
                <span> Quantity</span>
            </Grid>
            <Grid item container xs={3} justify="center">
                <span> Price</span>
            </Grid>
        </Grid>
    );
};

export default TableOrderHeader;