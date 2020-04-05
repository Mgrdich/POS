import React from 'react';
import {Paper} from "@material-ui/core";

const TableOrders: React.FC = () => {
    return (
        <div className="table-order-container">
        <Paper className="products-paper">
            <div className="products-header">
                <h1>Table order</h1>
            </div>
        </Paper>
        </div>
    );
};

export default TableOrders;