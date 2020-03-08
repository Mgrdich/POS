import * as yup from "yup";
import {InputField} from "../../interfaces/General";

//Login.tsx
export const LoginValSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5)
});

export const LoginInputFields:Array<InputField> = [
    {
        name: 'email',
        placeholder: 'Email'
    }
    ,
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
    }
];

//Register.tsx

export const RegisterInputFields:Array<InputField> = [
    {
        name: 'name',
        placeholder: 'Name'
    },
    {
        name: 'email',
        placeholder: 'Email'
    },
    {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
    },
    {
        name: 'confirm_password',
        placeholder: 'Confirm Password',
        type: 'password'
    }
];

export const RegisterValSchema = yup.object().shape({
    name: yup.string().required().min(4),
    email: yup.string().required().email(),
    password:yup.string().required().min(5),
    confirm_password:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});