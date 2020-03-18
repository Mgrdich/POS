import React from 'react';
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import {IAlertQuestion} from "../../interfaces/Reusable";



const AlertQuestion: React.FC<IAlertQuestion> = (props) => {
    const {open, close, data, setData, id, children} = props;

    function handleClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        props.close(false);
    }

    const action = () => {
        const filteredRows = data.filter((row: any) => row._id != id);
        setData(filteredRows);
        close(false);
    };

    return (

        <Snackbar style={{bottom: '75px',}} open={open}>
            <Alert severity='info'
                   action={<><DoneIcon style={{cursor: 'pointer'}} onClick={action}/> <CancelIcon
                       style={{cursor: 'pointer', marginLeft: '10px'}} onClick={handleClose}/></>}>
                {children}
            </Alert>
        </Snackbar>
    );
};

export default AlertQuestion;