import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    DialogActions,
    DialogContent,
    Typography,
    DialogTitle
} from '@material-ui/core';
import {dateFormat, DefaultValue} from "../../util/functions";
import {EditAcountDetails, IAccountDetails} from "../../interfaces/Views/Profile";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {AccountDetailsEditInputFields, AccontDetailsValSchema} from "./config";
import axios from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {useModal} from "../../components/Hooks/useModal";
import {Dialog} from '@material-ui/core';

const AccountDetails: React.FC<IAccountDetails> = (props) => {
    const {isLoading, data, setRefetch} = props;
    const {handleSubmit, register, errors, control} = useForm<EditAcountDetails>({
        validationSchema: AccontDetailsValSchema
    });
     //TODO set alert message on error
    const [serverError, setterError] = useServerErrorHandle();
    const [open, handleClickOpen, handleClose] = useModal();

    //TODO inside useEffect
    const modifiedInputFields = DefaultValue(AccountDetailsEditInputFields,data);

    //TODO cached functions
    const onSubmit = function (values: any): void {
        axios.put('/users/edit-user', values)
            .then(function (res: IAlertAxiosResponse) {
                handleClose();
                setRefetch((prev:boolean) => !prev );
                
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    return (
        <>
            <ComponentLoader isLoading={isLoading}>
                <Card variant="outlined" style={{width: '30%'}}>
                    <CardContent>
                        <Typography color="primary" component='h1' gutterBottom>
                            Details
                        </Typography>
                        <Typography>
                            Name: {data.name}
                        </Typography>
                        <Typography>
                            Email: {data.email}
                            <br/>
                            Role: {data.role}
                        </Typography>
                        <Typography variant="caption" component="p">
                            Created at: {dateFormat(data.createdAt)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color='primary' onClick={handleClickOpen}>Edit</Button>
                    </CardActions>
                </Card>
            </ComponentLoader>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DynamicFields
                        Component={DialogContent}
                        InputFields={modifiedInputFields}
                        register={register}
                        errors={errors}
                        control={control}
                        serverError={serverError}
                    />
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={handleClose}
                        >Cancel</Button>
                        <Button
                            color="primary"
                            type="submit"
                        >Submit</Button>
                    </DialogActions>
                </form>
           {/*TODO ADD ALERT FOR ERRORS*/}
            </Dialog>

        </>
    )
};

export default AccountDetails;