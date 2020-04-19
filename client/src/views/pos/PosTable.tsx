import React, {useEffect} from 'react';
import {Grid, IconButton} from "@material-ui/core";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import {useDispatch, useSelector} from "react-redux";
import ErrorHandler from "../errors/ErrorHandler";
import ChosenEmployee from "./ChosenEmployee";
import {Redirect, useHistory, useParams} from "react-router";
import Products from "./Products";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {isEmpty} from "../../util/functions";
import {fetchOrders, fetchTableOrders, setOrderId} from "../../actions/posActions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";


const PosTable: React.FC = () => {
    const error = useSelector<any>(state => state.pos.error);
    const Orders:any = useSelector<any>(state => state.pos.Orders);
    const isLoading:any = useSelector<any>(state => state.pos.isLoading);
    const tableHashed:any = useSelector<any>(state => state.pos.tableHashed);
    const orderId:any = useSelector<any>(state => state.pos.orders._id);
    let dispatch = useDispatch();
    let history = useHistory();
    let {id} = useParams();

    useEffect(function () {
        if(isEmpty(Orders)){
            dispatch(fetchOrders());
        }
    },[Orders,id,dispatch]);

    useEffect(function () {
        if(!isEmpty(tableHashed)) {
            dispatch(setOrderId(id))
        }
    },[tableHashed,id,dispatch]);

    useEffect(function () {
        if (orderId) {
            dispatch(fetchTableOrders(orderId));
        }
    }, [dispatch, orderId]);


    return (
        <>
            <div>
                <IconButton onClick={() => {
                    (history.push(`/pos`))
                }}>
                    <ArrowBackIcon color="primary"/>
                </IconButton>
                <ChosenEmployee/>
            </div>
            <ErrorHandler error={error as boolean}>
                <ComponentLoader isLoading={isLoading || (isEmpty(Orders) && id && tableHashed[id])}>
                    {(id && tableHashed[id]) ? (
                        <Grid container direction="row" justify="space-around" className="pos-container">
                            <Grid item xs={12} md={3} className="pos-grid">
                                <TableOrders/>
                            </Grid>
                            <Grid item xs={12} md={8} className="pos-grid">
                                <ProductsGroups/>
                                <Products/>
                            </Grid>
                        </Grid>
                    ) : <Redirect to={`/pos/no-orders/${id}`}/>}
                </ComponentLoader>
            </ErrorHandler>
        </>
    );
};

export default PosTable;