import {ButtonProps, CircularProgressProps} from "@material-ui/core";
import {condition, IActionsOptions, InputField} from "../General";
import * as React from "react";
import {ReactNode} from "react";
import {Color} from "@material-ui/lab/Alert";
import {TableActionOptions} from "../../constants/Enums/General";

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
    boxProps?:any; //when component props is not used
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
    callback:Function;
    children: ReactNode;
}

export interface IMyTable {
    keys: any; //TODO Check the type
    thead: any;
    tbody: Array<object>;
    pagination?: boolean;
    paginationRowsCount?: Array<number>;
    actionsTypes?:Array<TableActionOptions>;
    handleActions?:Function;
}


export interface IMyTableBody {
    data: Array<object>
    keys:Array<string>;
    page?:any; // TODO CHECK THE TYPE
    rowsPerPage?:any;
    actionsTypes?:Array<TableActionOptions>;
    handleActions?:Function;
    actionsDisableOptions?:IActionsOptions; //TODO make it for multiple options with value Array
    actionsRemovalOptions?:IActionsOptions;
}

export interface IMyTableHead {
    data: any; //object
    actionsTypes?:Array<string>;
    keys:Array<string>;
    actions?:Array<any>;
}

export interface ICardMessage {
    header:string;
    message?:string;
    translation?:string;
    location?:string;
    button?:boolean;
    children?:ReactNode;
}

export interface IModal {
    open:boolean;
    handleClose:Function;
    message:string;
    action:Function;
    modalTitle?:string;
}

export interface IBarChart {
    data: Array<any>;
    x: string;
    y: string;
    tickFormat: Array<string>;
    labelsKey: string;
    colorScale?: Array<string>;
    tickFormatFunction?: Function;
    labelsFunction?: Function;
    chartSize:{height:number; width:number;};
    title?:string;
    toolTipPosition?: 'top' | 'left'| 'right'| 'bottom';
}

export interface IInterpolationChart {
    data: Array<any>;
    tickFormat: Array<string>;
    labelsKey: string;
    colorScale?: Array<string>;
    tickFormatFunction?: Function;
    labelsFunction?: Function;
    chartSize:{height:number; width:number;};
    title?:string;
    toolTipPosition?: 'top' | 'left'| 'right'| 'bottom';
    interpolation?: 'linear' | 'cardinal'
}

export interface IHorizontalGroupChart {
    data: Array<any>;
    x: string;
    y: string;
    tickFormat: Array<string>;
    labelsKey: string;
    colorScale?: Array<string>;
    tickFormatFunction?: Function;
    labelsFunction?: Function;
    chartSize:{height:number; width:number;};
    title?:string;
    toolTipPosition?: 'top' | 'left'| 'right'| 'bottom';
}

export interface IControlledDropDown {
    id: string;
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    data: Array<IDropDownData>;
    ignoreNone?: boolean;
    size?: "small" | "medium" | undefined;
    handleOnChange?:Function;
    defaultValue?: Array<any> | string | number;
}

export interface IComponentLoader {
    isLoading: boolean;
    children?: ReactNode;
}

export interface IConditional {
    children: React.ReactNode;
    condition: boolean;
}

export interface IDropDown {
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

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export interface IMenuCard {
    products: {
        name: string;
        price: number;
    };
    image?: string;
    onClick: any; // TODO check the type
}

