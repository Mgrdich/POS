import * as yup from "yup";
import {IAddProductInputField} from "../../interfaces/Views/products";


export const addProductInputField: Array<IAddProductInputField> = [
    {
        name: 'name',
        placeholder: 'Product name',
    },
    {
        name: 'price',
        placeholder: 'Product price',
    },
    {
        name: 'productsGroup',
        placeholder: 'Product Groups',
        type: 'select',
        url: '/api/products-group',
        ignoreNone:false,
    },
];

export const editProductInputField: Array<IAddProductInputField> = [
    {
        name: 'name',
        placeholder: 'Product name',
    },
    {
        name: 'price',
        placeholder: 'Product price',
    },
    {
        name: 'productsGroup',
        placeholder: 'Product Groups',
        type: 'select',
        url: '/api/products-group',
        ignoreNone:false,

    },
];


export const addProductValSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.string().test('price', 'Invalid Value', (value) =>  !isNaN(parseInt(value)) ? value : null),
    productsGroup:yup.string()
});
export const editProductValSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.string().test('price', 'Invalid Value', (value) =>  !isNaN(parseInt(value)) ? value : null),
    productsGroup:yup.string()
});