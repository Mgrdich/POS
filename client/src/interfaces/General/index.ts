import {IDropDownData} from "../Reusable";
import {AxiosResponse} from "axios";
import {Color} from "@material-ui/lab";

export interface InputField {
    name: string;
    id?:string;
    type?: string;
    placeholder: string;
    required?: boolean;
    data?: Array<IDropDownData>;
    default?:any;
    url?:string;
    ignoreNone?:boolean;
}

export interface IAlertAxiosResponse extends AxiosResponse {
    data: {
        message: string;
        alertOpen: boolean;
        alert: Color;
    }
}
