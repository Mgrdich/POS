import React, {ChangeEvent} from 'react';
import {isEmpty} from "../../util/functions";
import {Checkbox, Grid, IconButton, Tooltip} from "@material-ui/core";
import {setGroupAction, setQuantityOrderProduct} from "../../actions/posActions";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {useDispatch, useSelector} from "react-redux";
import {INonSubmittedOrders} from "../../interfaces/Views/pos";

const NonSubmittedOrders: React.FC<INonSubmittedOrders> = (props) => {
    const {nonSubmittedOrdersKeys} = props;
    const nonSubmittedOrders: any = useSelector<any>(state => state.pos.nonSubmittedOrders);
    const productsGroupData: any = useSelector<any>(state => state.pos.productsGroups.data);
    const checkedGroupActions:any = useSelector<any>(state => state.pos.groupActions);
    const ordersId: any = useSelector<any>(state => state.pos.orders._id);
    const dispatch = useDispatch();

    return (
        <>
            {!isEmpty(nonSubmittedOrders[ordersId]) && nonSubmittedOrdersKeys.length? nonSubmittedOrdersKeys.map((key: string) => {
                if(!nonSubmittedOrders[ordersId][key]) { //TODO check the reason
                    return
                }
                let productGroupId = nonSubmittedOrders[ordersId][key].productsGroupId;
                let product = productsGroupData[productGroupId].products[key];
                let productQuantity:number = nonSubmittedOrders[ordersId][key].quantity;
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
                            <Tooltip title={product.name} placement="top" arrow>
                                <span className="ellipses">{product.name}</span>
                            </Tooltip>
                        </Grid>
                        <Grid item container xs={4} justify="center" alignContent="center">
                            <span>
                                <IconButton
                                    color="primary"
                                    disabled={productQuantity===1}
                                    onClick={()=>dispatch(setQuantityOrderProduct(ordersId,key,productQuantity,-1))}>
                                    <RemoveIcon/>
                                </IconButton>
                                {productQuantity}
                                <IconButton
                                    onClick={()=>dispatch(setQuantityOrderProduct(ordersId,key,productQuantity,1))}>
                                    <AddIcon color="primary"/>
                                </IconButton>
                            </span>
                        </Grid>
                        <Grid item container xs={3} justify="center" alignContent="center">
                            <Tooltip title={product.price} placement="top" arrow>
                                <span className="ellipses">{product.price}</span>
                            </Tooltip>
                        </Grid>
                    </Grid>)
            }) : null}

        </>
    );
};

export default NonSubmittedOrders;