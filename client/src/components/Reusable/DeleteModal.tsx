import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {IModal} from "../../interfaces/Reusable";




const DeleteModal : React.FC<IModal> = (props) => {
    const {open, handleClose, message, action, modalTitle} = props;
    const handleAction = () => {
        action();
        handleClose();
    };
    return (
        <div>
            <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title"
                    fullWidth={true}>
                <DialogTitle id="delete-group">{modalTitle ? modalTitle : 'Delete'}</DialogTitle>
                <DialogContent>
                    <Typography component='p' color='primary'>
                        {message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={ () => handleClose()}
                    >Cancel
                    </Button>
                    <Button
                        onClick={handleAction}
                        color="primary"
                    >Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteModal;