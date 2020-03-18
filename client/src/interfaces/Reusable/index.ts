import {ButtonProps, CircularProgressProps} from "@material-ui/core";
import {InputField} from "../General";
import * as React from "react";
import {ReactNode} from "react";
import {Color} from "@material-ui/lab/Alert";

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
    render?:any;
    Component?:React.FC | any;
    ComponentProps?:any;
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
}

export interface IAlerts {
    open:boolean;
    close:Function;
    severity:Color;
    children:ReactNode;

}
export interface IAlertQuestion {
    open: boolean;
    close: Function;
    data: Array<any>;
    setData: Function;
    id: number;
    children: ReactNode;
}

export interface IMyTable {
    keys: Array<string>
    thead: Array<string>;
    tbody: Array<object>;
    pagination?: boolean;
    paginationRowsCount?: Array<number>;

}


export interface IMyTableBody {
    data: Array<object>
    keys:Array<string>;
    page?:any; // TODO CHECK THE TYPE
    rowsPerPage?:any;
}

export interface IMyTableHead {
    data: any; //object
    keys:Array<string>;
}