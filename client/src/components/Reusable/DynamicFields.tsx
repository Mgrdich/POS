import React from 'react';
import {InputField} from "../../interfaces/General";
import DropDown from "./DropDown";
import {TextField} from "@material-ui/core";
import {IDynamicFields} from "../../interfaces/Reusable";
import {errorChecker, errorText} from "../../util/views";
import PasswordField from "./PasswordField";


const DynamicFields: React.FC<IDynamicFields> = (props) => {
    const {errors, register, serverError, control} = props;
    return (
        <>
            {
                props.InputFields.map((item: InputField, index: number) => {
                    //TODO register equality should be all over here for more custom checking
                    if (item.type === 'select') {
                        return (
                            <DropDown
                                defaultValue={item.default}
                                id={(item.id)?item.id:item.name}
                                label={item.placeholder}
                                name={item.name}
                                key={index}
                                data={item.data}
                                control={control}
                                error={errorChecker(item.name,errors,serverError)}
                                helperText={errorText(item.name,errors,serverError)}
                            />
                        )
                    } else if(item.type === 'password'){
                        return (
                            <PasswordField
                                label={item.placeholder}
                                id={(item.id)?item.id:item.name}
                                name={item.name}
                                key={index}
                                inputRef={(!item.required) ? register : register({
                                    required: "This Field is Required"
                                })}
                                error={errorChecker(item.name,errors,serverError)}
                                helperText={errorText(item.name,errors,serverError)}
                            />
                        );
                    } else {
                        return (
                            <TextField
                                defaultValue={item.default}
                                key={index}
                                id={item.name}
                                name={item.name}
                                label={item.placeholder}
                                variant="outlined"
                                color="primary"
                                inputRef={(!item.required) ? register : register({
                                    required: "This Field is Required"
                                })}
                                rows={(item.type === 'textArea') ? 4 : 1}
                                error={errorChecker(item.name,errors,serverError)}
                                helperText={errorText(item.name,errors,serverError)}
                            />
                        )
                    }
                })
            }
        </>
    );
};

export default DynamicFields;