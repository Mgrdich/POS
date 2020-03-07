import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

const Alerts : React.FC<any> = (props) => { //TODO add interface

   function handleClose(event?: React.SyntheticEvent, reason?: string){
       if (reason === 'clickaway') {
           return;
       }
       props.close(false);
   }
    return (
        <Snackbar style={{bottom: '75px',}} open={props.open} onClose={handleClose} autoHideDuration={3000}>
            <Alert variant="filled" severity={props.severity} onClose={handleClose}>
                {props.children}
            </Alert>
        </Snackbar>
    );

};

export default Alerts;