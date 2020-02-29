import React, {useEffect} from 'react';
import {Button, TextField} from "@material-ui/core";
import PasswordField from "../Reusable/PasswordField";
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {RouteComponentProps} from "react-router";
import {errorChecker, errorText} from "../../util/views";
import {loginUser} from "../../actions/authActions";
import Grid from "@material-ui/core/Grid";
import LoginRegisterTemplate from "./LoginRegisterTemplate";


type FormData = {
    email: string;
    password: string;
}

const Login: React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control} = useForm<FormData>();
    const [serverError, setterError] = useServerErrorHandle();
    const isAuth  = useSelector<any>(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(function () {
        if (isAuth) {
            props.history.push('/dashboard');
        }
    }, [isAuth, props.history]);

    const onSubmit = function (values: any) {
        axios.post('/users/login', values)
            .then(function (res: any) {
                dispatch(loginUser(res));
            }).catch(function (e: any) {
            if (!e.response.data) {
                   console.error("No Response is found");
            }
            setterError(e.response.data);
        });
    };
        // TODO FE: Change to grid
    const LoginFields = [{name:'email', placeholder:'email'},{name:'password', placeholder:'password', type:'password'}];
    return (
        <LoginRegisterTemplate
            templateName='Login'
            dynamicInputFields={{InputFields: LoginFields, register, control, errors, serverError}}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}/>
    );
};

export default Login;