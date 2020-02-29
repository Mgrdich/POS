import React from "react";
import DropDown from "./DropDown";
import {errorChecker, errorText} from "../../util/views";
import PasswordField from "./PasswordField";
import {TextField} from "@material-ui/core";
import {InputField} from "../../interfaces/General";


interface IDynamicField {
item:InputField;
errors:object;
register:Function;
serverError:object;
control:object;
index:number;
}



const DynamicField: React.FC<IDynamicField> = (props) => {;
    const {errors, register, serverError, control} = props;
    const {id, placeholder, type, name, url, data, validation} = props.item;
    const {index} = props;
    return (
        <>
            {
                  type === 'select'?
                         (
                            <DropDown
                                defaultValue={props.item.default}
                                id={(id) ? id : name}
                                label={placeholder}
                                url={(url) ? url : ''}
                                name={name}
                                key={index}
                                data={(data) ? data : []}
                                control={control}
                                error={errorChecker(name, errors, serverError)}
                                helperText={errorText(name, errors, serverError)}
                            />
                        ): props.item.type === 'password'?
                       (
                           <PasswordField
                               label={placeholder}
                               id={(id) ? id : name}
                               name={name}
                               key={index}
                               inputRef={validation ? register(validation) : register}
                               error={errorChecker(name, errors, serverError)}
                               helperText={errorText(name, errors, serverError)}
                           />
                       ) : <TextField
                           defaultValue={props.item.default}
                           key={index}
                           id={name}
                           name={name}
                           label={placeholder}
                           variant="outlined"
                           color="primary"
                           inputRef={validation ? register(validation) : register}
                           rows={(type === 'textArea') ? 4 : 1}
                           error={errorChecker(name, errors, serverError)}
                           helperText={errorText(name, errors, serverError)}
                       />

            }

        </>
    )

};


export default DynamicField;