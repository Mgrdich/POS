import React, {ReactNode} from 'react';
import DynamicFields from "../Reusable/DynamicFields";
import {Button, Grid} from "@material-ui/core";
import {ILoginRegisterTemplate} from "../../interfaces/Views/auth";

const LoginRegisterTemplate: React.FC<ILoginRegisterTemplate> = (props) => {
    const {dynamicInputFields, templateName, handleSubmit, onSubmit} = props;
    return (
        <div className='loginRegister'>
            <h1>{templateName}</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                <DynamicFields
                    Component={Grid}
                    {...dynamicInputFields}
                />

                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    className="submitBtn"
                    type="submit"
                >{templateName}</Button>
            </form>
        </div>
    );
};

export default LoginRegisterTemplate;