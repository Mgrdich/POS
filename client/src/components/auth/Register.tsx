import React from 'react';
import {useForm} from "react-hook-form";
import axios, {AxiosResponse} from 'axios';
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {RouteComponentProps} from "react-router";
import LoginRegisterTemplate from "./LoginRegisterTemplate";
import {RegisterFormDataType} from "../../interfaces/Views/auth";
import {RegisterInputFields,RegisterValSchema} from "./config";

const Register: React.FC<RouteComponentProps>= (props) => {
    const {handleSubmit, register, errors,control} = useForm<RegisterFormDataType>({
        validationSchema:RegisterValSchema
    });
    const [serverError, setterError] = useServerErrorHandle();

    const onSubmit = function (values: any):void {

        axios.put('/users/register', values)
            .then(function (res:AxiosResponse) {
                props.history.push('/login');
            }).catch(function (e: any) {
            if (!e.response.data) {
                console.error("No Response is found");
            }
            setterError(e.response.data.data);
        })
    };

    return (
        <LoginRegisterTemplate
            templateName='Register'
            dynamicInputFields={{InputFields: RegisterInputFields, register, control, errors, serverError}}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        />
    );
};

export default Register;