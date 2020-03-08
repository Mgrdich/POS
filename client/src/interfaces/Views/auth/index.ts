import {IDynamicFields} from "../../Reusable";


export interface ILoginRegisterTemplate {
    templateName: string;
    dynamicInputFields: IDynamicFields;
    handleSubmit: Function;
    onSubmit: Function;
}

//Login.tsx
export type LoginFormDataType = {
    email:string;
    password:string;
}

//Register.tsx
export type RegisterFormDataType = {
    email: string;
    password: string;
    name: string;
    confirm_password: string;
}


