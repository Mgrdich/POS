import {InputField} from "../../../interfaces/General";
import * as yup from "yup";

export const createUsersInputFields : Array<InputField> = [
    {
        name: 'name',
        placeholder: 'name',
    },
    {
        name: 'email',
        placeholder: 'email',
    },
    {
        name: 'password',
        placeholder: 'password',
        type:'password',
    },
    {
        name: 'current_password',
        placeholder: 'current password',
        type:'password',
    },
    {
        name: 'roles',
        placeholder: 'role',
        type:'select',
        url:'/users/roles',
    }
];

export const createUsersValSchema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().required().email(),
    password:yup.string().required().min(5),
    current_password:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    roles:yup.string().required(),
});