import * as yup from "yup";

interface IProductGroup {
    name: string;
    placeholder: string;
    type?: string;
    url?: string;
    ignoreNone?:boolean;

};


export const productGroupInputField: Array<IProductGroup> = [
    {
        name: 'name',
        placeholder: 'Product group name',
    }
];
export const editProductGroupInputField: Array<IProductGroup> = [
    {
        name: 'name',
        placeholder: 'Product group name',
    }
];



export const productGroupValSchema = yup.object().shape({
    name: yup.string().required(),
});

export const editProductGroupValSchema = yup.object().shape({
    name: yup.string().required(),
});