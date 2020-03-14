import React, {useState} from 'react';
import Loader from "../../components/Reusable/Loader";
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {dateFormat} from "../../util/functions";
import {EditAcountDetails, IAccountDetails} from "../../interfaces/Views/Profile";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {AccountDetailsEditInputFields, AccontDetailsValSchema} from "./config";
import {useDefaultValue} from "../../components/Hooks/useDefaultValue";
import axios from "axios";
import {IAlertAxiosResponse} from "../../interfaces/General";
import {useAlert} from "../../components/Hooks/useAlert";
import Alerts from "../../components/Reusable/Alerts";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const AccountDetails: React.FC<IAccountDetails> = (props) => {
    const {isLoading, data} = props;
    const [editMode, changeEditMode] = useState<boolean>(false);
    const {handleSubmit, register, errors, control, reset} = useForm<EditAcountDetails>({
        validationSchema: AccontDetailsValSchema
    });
    const {alertMessage, openAlert, alertType, setAlert, setOpenAlert} = useAlert(); //TODO set alert message on error
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const modifiedInputFields = useDefaultValue(AccountDetailsEditInputFields, data);


    const onSubmit = function (values: any): void {
        axios.put('/users/edit-user', values)
            .then(function (res: IAlertAxiosResponse) {
                changeEditMode(false);

            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        });
    };

    //tODO make the loading with reusable like a wrapper

    if (editMode) {
        return (
            <>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <DynamicFields
                        InputFields={modifiedInputFields}
                        register={register}
                        errors={errors}
                        control={control}
                        serverError={serverError}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        className="submitBtn"
                        onClick={() => changeEditMode(false)}
                    >Cancel</Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        className="submitBtn"
                        type="submit"
                    >Submit</Button>
                </form>
                <Alerts open={openAlert} close={setOpenAlert} severity={alertType}>
                    {alertMessage}
                </Alerts>
            </>

        )
    } else {
        return (
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
                            Created at: {dateFormat(data.date)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color='primary' onClick={() => changeEditMode(true)}>Edit</Button>
                    </CardActions>
                </Card>
            </ComponentLoader>
        )
    }

};

export default AccountDetails;