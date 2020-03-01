import {ButtonProps, CircularProgressProps} from "@material-ui/core";
import {InputField} from "../General";
import * as React from "react";

export interface IDropDownData {
    value: number | string;
    placeholder: string;
    id?: string;
}

export interface IButtonLink extends ButtonProps {
    to: string;
    children:string;
}

export interface IDatePicker {
    format?: string;
    id: string;
    label: string;
    defaultDate: Date | null;
    control: any;
    name: string;
    disabled?: boolean;
    helperText?: string;
    error?:boolean;
}

export interface IDynamicFields {
    InputFields: Array<InputField>
    register: React.Ref<any>;
    serverError: any;
    errors: any;
    control: any;
}

export interface ILoader extends CircularProgressProps {
    className?: string;
}

export interface IPasswordField {
    id?:string
    label: string; //TODO id ref like dropdown
    error?: boolean;
    name: string;
    inputRef?: any;
    helperText?: string | boolean;
}

export interface IDynamicField {
    item: InputField;
    errors: object;
    register: React.Ref<any>;
    serverError: object;
    control: object;
    index: number;
}
