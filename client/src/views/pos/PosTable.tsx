import React from 'react';
import {Grid} from "@material-ui/core";
import TableOrders from './TableOrders';
import ProductsGroups from "./ProductsGroups";
import {useSelector} from "react-redux";
import ErrorHandler from "../errors/ErrorHandler";
import ChosenEmployee from "./ChosenEmployee";
import {useParams} from "react-router";
import Products from "./Products";
import NoOrder from "./NoOrder";

const PosTable: React.FC = () => {
    const error = useSelector<any>(state => state.pos.error);
    const {id} = useParams();
    const tableOrderHash: any = useSelector<any>(state => state.pos.tableHashed);

    return (
        <div>
            <div>
                <ChosenEmployee/>
            </div>
            <ErrorHandler error={error as boolean}>
                {(id && tableOrderHash[id]) ? (
                    <Grid container direction="row" justify="space-around" className="pos-container">
                        <Grid item xs={12} sm={3} className="pos-grid">
                            <TableOrders/>
                        </Grid>
                        <Grid item xs={12} sm={8} className="pos-grid">
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