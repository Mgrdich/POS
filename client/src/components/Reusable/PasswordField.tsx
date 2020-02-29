import React, {useEffect, useRef, useState} from 'react';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {IPasswordField} from "../../interfaces/Reusable";


const PasswordField: React.FC<IPasswordField> = (props) => {
    const [showPassword, changeShowPassword] = useState<boolean>(false);
    const [labelWidth,setLabelWidth] = useState<number>(70);
    const ref = useRef <any>({offsetWidth:70}); // TODO check the type

    useEffect(() => {
        const width = ref.current ? ref.current.offsetWidth : 70;
        setLabelWidth(width);
    }, []);

    const handleMouseDownPassword = function(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined" error={props.error}>
            <InputLabel ref={ref}>{props.label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => changeShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                inputRef={props.inputRef}
                name={props.name}
                labelWidth={labelWidth}
            />
            <FormHelperText id={props.id}>{props.helperText?props.helperText:''}</FormHelperText>
        </FormControl>
    );
};

export default PasswordField;