import React from 'react';
import {Button, TextField} from "@material-ui/core";
import PasswordField from "../Reusable/PasswordField";
import {useForm} from "react-hook-form";
import axios, {AxiosResponse} from 'axios';
import {useServerErrorHandle} from "../Hooks/useServerErrorHandle";
import {RouteComponentProps} from "react-router";
import {errorChecker, errorText} from "../../util/views";

type FormData = {
    email: string;
    password: string;
    name: string;
    current_password: string;
}

const Register: React.FC<RouteComponentProps>= (props) => {
    const {handleSubmit, register, errors} = useForm<FormData>();
    const [serverError, setterError] = useServerErrorHandle();

    const onSubmit = function (values: any) {

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
        <>
            <h1>Register</h1>
            <div className="form">
                <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="name"
                        label="Name"
                        name="name"
                        variant="outlined"
                        error={errorChecker('name',errors,serverError)}
                        inputRef={register({
                            required: "This Field is Required"
                        })}
                        helperText={errorText('name',errors,serverError)}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        error={errorChecker('email',errors,serverError)}
                        inputRef={register({
                            required: "This Field is Required"
                        })}
                        helperText={errorText('email',errors,serverError)}

                    />
                    <PasswordField
                        label="Password"
                        name="password"
                        inputRef={register({
                            required: "This Field is Required",
                        })}
                        error={errorChecker('password',errors,serverError)}
                        helperText={errorText('password',errors,serverError)}
                    />
                    <PasswordField
                        label="Current Password"
                        labelWidth={130}
                        name="current_password"
                        inputRef={register({
                            required: "This Field is Required",
                        })}
                        error={errorChecker('current_password',errors,serverError)}
                        helperText={errorText('current_password',errors,serverError)}
                    />
                    <Button color="primary" variant="contained" size="large" className="submitBtn"
                            type="submit">Register</Button>
                </form>
            </div>

        </>
    );
};

export default Register;