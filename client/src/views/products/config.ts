import * as yup from "yup";

interface IAddProductInputField {
    name: string;
    placeholder: string;
    type?: string;
    url?: string;
    ignoreNone?:boolean;

};


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



export const addProductValSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.string().test('price', 'Invalid Value', (value) =>  !isNaN(parseInt(value)) ? value : null),
    productsGroup:yup.string()
});
