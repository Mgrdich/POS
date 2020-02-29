import * as yup from "yup";
import {InputField} from "../../interfaces/General";

//Login.tsx
export const LoginValSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().min(5)
});

export const LoginInputFields:Array<InputField> = [
    {
        name: 'email',
        placeholder: 'email'
    }
    ,
    {
        name: 'password',
        placeholder: 'password',
        type: 'password'
    }
];

//Register.tsx

export const RegisterInputFields:Array<InputField> = [
    {
        name: 'name',
        placeholder: 'name'
    },
    {
        name: 'email',
        placeholder: 'email'
    },
    {
        name: 'password',
        placeholder: 'password',
        type: 'password'
    },
    {
        name: 'current_password',
        placeholder: 'current password',
        type: 'password'
    }
];

export const RegisterValSchema = yup.object().shape({
    name: yup.string().required().min(4),
    email: yup.string().required().email(),
    password:yup.string().required().min(5),
    current_password:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});