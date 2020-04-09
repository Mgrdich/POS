import React from 'react';
import {IconButton, Grid} from "@material-ui/core";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import {useSelector} from "react-redux";
import ErrorHandler from "../errors/ErrorHandler";
import ChosenEmployee from "./ChosenEmployee";
import {useHistory, useParams} from "react-router";
import Products from "./Products";
import NoOrder from "./NoOrder";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const PosTable: React.FC = () => {
    const error = useSelector<any>(state => state.pos.error);
    const {id} = useParams();
    const tableOrderHash: any = useSelector<any>(state => state.pos.tableHashed);
    let history = useHistory();

    return (
        <div>
            <div>
                <IconButton onClick={() => {
                    (history.push(`/pos`))
                }}>
                    <ArrowBackIcon color="primary"></ArrowBackIcon>
                </IconButton>
                <ChosenEmployee/>
            </div>
            <ErrorHandler error={error as boolean}>
                {(id && tableOrderHash[id]) ? (
                    <Grid container direction="row" justify="space-around" className="pos-container">
                        <Grid item xs={12} md={3} className="pos-grid">
                            <TableOrders/>
                        </Grid>
                        <Grid item xs={12} md={8} className="pos-grid">
                            <ProductsGroups/>
                            <Products/>
                        </Grid>
                    </Grid>
                ) : <NoOrder/>}
            </ErrorHandler>
        </div>
    );
};

export default PosTable;