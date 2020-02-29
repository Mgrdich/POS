import React, {useRef} from 'react';
import {useForm} from "react-hook-form";
import axios, {AxiosResponse} from 'axios';
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {RouteComponentProps} from "react-router";
import LoginRegisterTemplate from "./LoginRegisterTemplate";

type FormData = {
    email: string;
    password: string;
    name: string;
    current_password: string;
}

const Register: React.FC<RouteComponentProps>= (props) => {
    const {handleSubmit, register, errors, watch,control} = useForm<FormData>();
    const [serverError, setterError] = useServerErrorHandle();
    const password = useRef<any>();
    password.current = watch('password','');

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

// TODO FE: Change to grid , Check type for password
    const RegisterFields = [
        {name:'name', placeholder:'name'},
        {name:'email', placeholder:'email'},
        {name:'password', placeholder:'password',type:'password'},
        {name:'current_password', placeholder:'current password',type: 'password'}
        ];
    return (
        <LoginRegisterTemplate
            templateName='Register'
            dynamicInputFields={{InputFields: RegisterFields, register, control, errors, serverError}}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}/>
    );
};

export default Register;