import React, {useState} from 'react';
import Loader from "../../components/Reusable/Loader";
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {dateFormat} from "../../util/functions";
import {IAccountDetails} from "../../interfaces/Views/Profile";
import DynamicFields from "../../components/Reusable/DynamicFields";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../components/Hooks/useServerErrorHandle";
import {AccountDetailsEditInputFields, AccontDetailsValSchema} from "./config";
import {useDefaultValue} from "../../components/Hooks/useDefaultValue";

const AccountDetails: React.FC<IAccountDetails> = (props) => {
    const {isLoading, data} = props;
    const [editMode, changeEditMode] = useState<boolean>(false);
    const {handleSubmit, register, errors, control, reset} = useForm<any>({
        validationSchema: AccontDetailsValSchema
    });
    const [serverError, setterError, resetServerError] = useServerErrorHandle();
    const modifiedInputFields = useDefaultValue(AccountDetailsEditInputFields,data);


    const onSubmit = function (values: any): void {
        changeEditMode(false);
    };

    //tODO make the loading with reusable like a wrapper
    if (isLoading) {
        return (
            <Loader/>
        )
    } else if (editMode) {
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
                        type="submit"
                    >Submit</Button>
                </form>
            </>

        )
    } else {
        return (
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
        )
    }

};

export default AccountDetails;