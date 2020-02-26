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

type FormData = {
    email: string;
    password: string;
}

const Login: React.FC<RouteComponentProps> = (props) => {
    const {handleSubmit, register, errors} = useForm<FormData>();
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
        <>
            <h1>Login</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    error={errorChecker('email',errors,serverError)}
                    inputRef={register({
                        required: "This Field is Required"
                    })}
                    helperText={errorText('email',errors,serverError)}
                />
                <PasswordField
                    label="Password"
                    id="password"
                    name="password"
                    inputRef={register({
                        required: "This Field is Required",
                    })}
                    error={errorChecker('password',errors,serverError)}
                    helperText={errorText('password',errors,serverError)}
                />
                <Button color="primary" variant="contained" size="large" className="submitBtn"
                        type="submit">Login</Button>
            </form>
        </>
    );
};

export default Login;