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

const CreateUsers : React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control,unregister} = useForm<createUserFormDataType>({
        validationSchema:createUsersValSchema
    });
    const [serverError, setterError] = useServerErrorHandle();
    useDynamicFields(createUsersInputFields, register, unregister);
    
    const onSubmit = function (values: any):void {

        axios.put('/users/register-user', values)
            .then(function (res:AxiosResponse) {
                console.log('successfully created');
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        })
    };

    return (
        <>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DynamicFields
                    InputFields={createUsersInputFields}
                    register={register}
                    errors={errors}
                    control={control}
                    serverError={serverError}/>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className="submitBtn"
                    type="submit"
                >Submit</Button>
            </form>
        </>
    );
};

export default CreateUsers;