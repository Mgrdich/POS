import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";

const Alerts : React.FC<any> = (props) => { //TODO add interface
   function handleClose(){
       props.close(false);
   };
    return (
            <Snackbar open={props.open} onClose={handleClose} autoHideDuration={3000} >
                <Alert severity={props.severity}>
                    {props.children}
                </Alert>
            </Snackbar>
    );


};

export default Alerts;