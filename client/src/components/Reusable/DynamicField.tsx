import React from "react";
import DropDown from "./DropDown";
import {errorChecker, errorText} from "../../util/views";
import PasswordField from "./PasswordField";
import {TextField} from "@material-ui/core";
import {IDynamicField} from "../../interfaces/Reusable";

const DynamicField: React.FC<IDynamicField> = (props) => {
    const {errors, register, serverError, control, item} = props;
    const {id, placeholder, type, name, url, data} = item;

    switch (type) {
        case 'select':
            return (
                <DropDown
                    defaultValue={item.default}
                    id={(id) ? id : name}
                    label={placeholder}
                    url={(url) ? url : ''}
                    name={name}
                    data={(data) ? data : []}
                    control={control}
                    error={errorChecker(name, errors, serverError)}
                    helperText={errorText(name, errors, serverError)}
                />
            );
        case 'password':
            return (
                <PasswordField
                    label={placeholder}
                    id={(id) ? id : name}
                    name={name}
                    inputRef={register}
                    error={errorChecker(name, errors, serverError)}
                    helperText={errorText(name, errors, serverError)}
                />
            );
        default:
            return (
                <TextField
                    defaultValue={item.default}
                    id={name}
                    name={name}
                    label={placeholder}
                    variant="outlined"
                    color="primary"
                    inputRef={register}
                    rows={(type === 'textArea') ? 4 : 1}
                    error={errorChecker(name, errors, serverError)}
                    helperText={errorText(name, errors, serverError)}
                />
            );

    }
};


export default DynamicField;