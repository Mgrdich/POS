import React from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";

const NoOrder: React.FC<any> = () => {
    const dispatch = useDispatch();
    return (
        <div className="table-order-button">
            <Button
                variant="outlined"
                color="primary"
            >
                To Create a table order CLICK HERE
            </Button>
        </div>
    );
};

export default NoOrder;