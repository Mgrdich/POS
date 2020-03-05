import React, {useState} from 'react';
import DynamicFields from "../../../components/Reusable/DynamicFields";
import {createUsersInputFields, createUsersValSchema} from './config';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../../../components/Hooks/useServerErrorHandle";
import {Button} from "@material-ui/core";
import axios, {AxiosResponse} from "axios";
import {RouteComponentProps} from "react-router";
import {useDynamicFields} from "../../../components/Hooks/useDynamicFields";
import {createUserFormDataType} from "../../../interfaces/Views/users";
import Grid from "@material-ui/core/Grid";
import {useAlert} from "../../../components/Hooks/useAlert";
import Alerts from "../../../components/Reusable/Alerts";

const CreateUsers : React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control,unregister,reset} = useForm<createUserFormDataType>({
        validationSchema:createUsersValSchema,
    });
    const [open,setOpen]= useState({success:false,error:false});
    const [message,messageSetter] = useAlert();
    const [serverError, setterError,resetServerError] = useServerErrorHandle();
    useDynamicFields(createUsersInputFields, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/users/register-user', values)
            .then(function (res: AxiosResponse) {
                reset();
                resetServerError();
                messageSetter('successfully created');
                setOpen({...open,success:true});
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
                setOpen({...open,error:true});
                messageSetter(e.response.data.data.email)
        });
    };
    return (
        <>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container direction="row" alignContent='space-between' spacing={1}>
                    <DynamicFields
                        InputFields={createUsersInputFields}
                        register={register}
                        errors={errors}
                        control={control}
                        serverError={serverError}
                        Component={Grid}
                        ComponentProps={
                            {
                                item: true,
                                xs: 12,
                                md: 4,
                                lg: 3,
                            }
                        }
                    />

                </Grid>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className="FloatRight"
                    type="submit"
                >Submit</Button>
            </form>

            <Alerts open={open.success} close={setOpen} severity="success">
                {message}
            </Alerts>

            <Alerts open={open.error} close={setOpen} severity="error">
                {message}
            </Alerts>
        </>
    );
};

export default CreateUsers;