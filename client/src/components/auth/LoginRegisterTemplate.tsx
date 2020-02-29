import React from 'react';
import {IDynamicFields} from "../../interfaces/Reusable";
import DynamicFields from "../Reusable/DynamicFields";
import {Button} from "@material-ui/core";

interface ILoginRegisterTemplate {
    templateName: string;
    dynamicInputFields: IDynamicFields;
    handleSubmit: Function;
    onSubmit: Function;
}

const LoginRegisterTemplate: React.FC<ILoginRegisterTemplate> = (props) => {
    const {dynamicInputFields, templateName, handleSubmit, onSubmit} = props;
    return (
        <div className='loginRegister'>
            <h1>{templateName}</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <DynamicFields {...dynamicInputFields}  />
                <Button color="primary" variant="contained" size="large" className="submitBtn"
                        type="submit">{templateName}</Button>
            </form>
        </div>
    );
};

export default LoginRegisterTemplate;