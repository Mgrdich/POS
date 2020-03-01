import {IDropDownData} from "../Reusable";

export interface InputField {
    name: string;
    id?:string;
    type?: string;
    placeholder: string;
    required?: boolean;
    data?: Array<IDropDownData>;
    default?:any;
    url?:string;
}
