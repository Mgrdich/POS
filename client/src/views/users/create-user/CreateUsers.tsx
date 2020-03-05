import React from 'react';
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


const CreateUsers : React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control,unregister,reset} = useForm<createUserFormDataType>({
        validationSchema:createUsersValSchema,
    });
    const [message,messageSetter] = useAlert("");
    const [serverError, setterError,resetServerError] = useServerErrorHandle();
    useDynamicFields(createUsersInputFields, register, unregister);

    const onSubmit = function (values: any): void {
        axios.put('/users/register-user', values)
            .then(function (res: AxiosResponse) {
                reset();
                resetServerError();
                messageSetter('successfully created');
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
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
                                sm: 6,
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

            <h1>{message}</h1>
        </>
    );
};

export default CreateUsers;