import React, {useState} from 'react';
import {FormHelperText, MenuItem, TextField, FormControl} from "@material-ui/core";
import {IControlledDropDown, IDropDownData} from "../../interfaces/Reusable";



//TODO label width should be dynamic
const ControlledDropDown:React.FC<IControlledDropDown> = (props) => {

    const {id, data, name, helperText, label, error, ignoreNone, size, handleOnChange, defaultValue} = props;
    const [value, setValue] = useState(defaultValue);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(handleOnChange) {
            handleOnChange(event);    
        }
        setValue(event.target.value)
    };


    return (
            <FormControl error={error} >
                <TextField
                    name={name}
                    value={value}
                    id={id}
                    select
                    size={size}
                    label={label}
                    onChange={handleChange}
                    variant="outlined"
                    defaultValue={defaultValue}
                >
                    {!ignoreNone ?
                        (<MenuItem value="">
                            <em>None</em>
                        </MenuItem>)
                        :
                        null
                    }
                    {data.map((item:IDropDownData) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.placeholder}
                        </MenuItem>
                    ))}
                </TextField>
                <FormHelperText id={id}>{helperText ? helperText : ''}</FormHelperText>
            </FormControl>
    );
};

export default ControlledDropDown;