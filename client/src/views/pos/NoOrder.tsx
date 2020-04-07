import React from 'react';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {openOrder} from "../../actions/posActions";
import {useParams} from "react-router";
import ChosenEmployee from "./ChosenEmployee";

const NoOrder: React.FC<any> = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    return (
        <div>
        <div> <ChosenEmployee/> </div>
        <div className="table-order-button">
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>dispatch(openOrder(id))}
            >
                To Create a table order CLICK HERE
            </Button>
        </div>
        </div>
    );
};

export default NoOrder;