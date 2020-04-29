import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Controller} from "react-hook-form";
import {IDropDownData} from "../../interfaces/Reusable";
import axios, {AxiosResponse} from "axios";


interface IDropDown {
    id: string;
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    data?: Array<IDropDownData>;
    url?: string;
    control: any;
    defaultValue?: Array<any> | string | number;
    ignoreNone?: boolean;
    multiple?: boolean;
    size?: "small" | "medium" | undefined;
}


const Dropdown: React.FC<IDropDown> = (props) => {
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [data, setData] = useState<Array<IDropDownData>>((props.data) ? props.data : []);
    let defaultValue: any = (props.multiple) ? [] : '';

    if (!!props.defaultValue) {
        if (props.multiple && Array.isArray(props.defaultValue)) {
            defaultValue = [...props.defaultValue];
        } else {
            defaultValue = props.defaultValue;
        }
    }

    useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    useEffect(() => {
        if (props.url) {
            axios.get(props.url)
                .then(function (res: AxiosResponse) {
                    setData([...res.data]);
                })
        }
    }, [props.url]);
    return (
        <FormControl size={props.size} variant="outlined" error={props.error}>
            <InputLabel ref={inputLabel} id={props.id}>
                {props.label}
            </InputLabel>
            <Controller
                control={props.control} name={props.name}
                defaultValue={defaultValue}
                as={
                    <Select
                        labelId={props.id}
                        id="demo-simple-select-outlined"
                        labelWidth={labelWidth}
                        multiple={props.multiple}
                    >
                        {!props.ignoreNone || !props.multiple ?
                            (<MenuItem value="">
                                <em>None</em>
                            </MenuItem>)
                            :
                            null
                        }
                        {
                            data.map((item: IDropDownData, index) => {
                                return (
                                    <MenuItem value={item.value} key={index}>{item.placeholder}</MenuItem>
                                )
                            })
                        }
                    </Select>}

            />

            <FormHelperText id={props.id}>{props.helperText ? props.helperText : ''}</FormHelperText>
        </FormControl>
    );
};

export default Dropdown;