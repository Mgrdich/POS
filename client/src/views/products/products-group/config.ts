import * as yup from "yup";
import {IProductGroup} from "../../../interfaces/Views/products";



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