import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router";
import {loginUser} from "../../actions/authActions";
import LoginRegisterTemplate from "./LoginRegisterTemplate";
import axios from "axios";
import {LoginInputFields, LoginValSchema} from "./config";
import {LoginFormDataType} from "../../interfaces/Views/auth";


const Login: React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors, control} = useForm<LoginFormDataType>({
        validationSchema:LoginValSchema
    });
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

    return (
        <LoginRegisterTemplate
            templateName='Login'
            dynamicInputFields={{InputFields: LoginInputFields, register, control, errors, serverError}}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        />
    );
};

export default Login;