import * as yup from "yup";
import {ICreateTableInputField} from "../../interfaces/Views/tables";




export const creteTableInputField: Array<ICreateTableInputField> = [
    {
        name: 'name',
        placeholder: 'Table name',
    },
    {
        name: 'number',
        placeholder: 'Table number',
    },
];

yup.setLocale({
    number: {
        integer: "Invalid Value",
    },
});

export const createTableValSchema = yup.object().shape({
    name: yup.string().required(),
    number:yup.string().test('price', 'Invalid Value', (value) =>  !isNaN(parseInt(value)) ? value : null),
});
