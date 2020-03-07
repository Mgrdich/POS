import {InputField} from "../../../interfaces/General";
import * as yup from "yup";

export const createUsersInputFields : Array<InputField> = [
    {
        name: 'name',
        placeholder: 'Name',
    },
    {
        name: 'email',
        placeholder: 'Email',
    },
    {
        name: 'password',
        placeholder: 'Password',
        type:'password',
    },
    {
        name: 'current_password',
        placeholder: 'Confirm password',
        type:'password',
    },
    {
        name: 'role',
        placeholder: 'Role',
        type:'select',
        url:'/api/roles',
    }
];

export const createUsersValSchema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().required().email(),
    password:yup.string().required().min(5),
    current_password:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    role:yup.string().required(),
});