import React from 'react';
import {Button, IconButton} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {openOrder} from "../../actions/posActions";
import {useHistory, useParams} from "react-router";
import ChosenEmployee from "./ChosenEmployee";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const NoOrder: React.FC<any> = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();


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

            <div className="table-order-button">
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => dispatch(openOrder(id))}
                >
                    To Create a table order CLICK HERE
                </Button>
            </div>
        </>
    );
};

export default NoOrder;