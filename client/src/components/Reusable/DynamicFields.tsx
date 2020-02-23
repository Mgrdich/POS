import React from 'react';
import {InputField} from "../../interfaces/General";
import DropDown from "./DropDown";
import {TextField} from "@material-ui/core";
import {IDynamicFields} from "../../interfaces/Reusable";


const DynamicFields: React.FC<IDynamicFields> = (props) => {
    const {errors, register, serverError, control} = props;
    return (
        <>
            {
                props.InputFields.map((item: InputField, index: number) => {
                    let errorName: any = errors[item.name];
                    //TODO register equality should be all over here for more custom checking
                    if (item.type === 'select') {
                        return (
                            <DropDown
                                defaultValue={item.default}
                                id={item.name}
                                label={item.placeholder}
                                name={item.name}
                                key={index}
                                data={item.data}
                                control={control}
                                error={!!errorName || `${item.name}` in serverError}
                                helperText={(!!errorName && errorName.message || (`${item.name}` in serverError && serverError[item.name]))}
                            />
                        )
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
                                error={!!errorName || `${item.name}` in serverError}
                                helperText={(!!errorName && errorName.message || (`${item.name}` in serverError && serverError[item.name]))}
                            />
                        )
                    }
                })
            }
        </>
    );
};

export default DynamicFields;