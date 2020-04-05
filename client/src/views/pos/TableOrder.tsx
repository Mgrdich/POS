import React from 'react';
import {Button, Grid} from "@material-ui/core";

const TableOrder: React.FC<any> = () => {
    return (
        <div className="table-order-button">
            <Button
                variant="outlined"
                color="primary"
            >
                To create a table order CLICK HERE
            </Button>
        </div>
    );
};

export default TableOrder;