import {IDropDownData} from "../Reusable";

export interface InputField {
    name: string;
    id?:string;
    type?: "textArea" | "select" | "password";
    placeholder: string;
    required?: boolean;
    data?: Array<IDropDownData>;
    default?:any;
}
