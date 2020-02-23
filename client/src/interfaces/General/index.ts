import {IDropDownData} from "../Reusable";

export interface InputField {
    name: string;
    type?: "textArea" | "select";
    placeholder: string;
    required?: boolean;
    data?: Array<IDropDownData>;
    default?:any;
}
