import{InputField} from "../../interfaces/General";
import * as yup from "yup";

export const ChangePasswordInputField: Array<InputField> = [
    {
        name: 'current_password',
        placeholder: 'Current Password',
        type: 'password',
    },
    {
        name: 'new_password',
        placeholder: 'New Password',
        type: 'password',
    },
    {
        name: 'confirm_new_password',
        placeholder: 'Confirm new password',
        type: 'password',
    },
];

export const AccountDetailsEditInputFields: Array<InputField> = [
    {
        name: 'name',
        placeholder: 'Name'
    },
    {
        name: 'email',
        placeholder: 'Email'
    },
];

export const AccontDetailsValSchema = yup.object().shape({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
});

export const ChangePasswordValSchema = yup.object().shape({
    current_password: yup.string().required().min(5),
    new_password: yup.string().required().min(5),
    confirm_new_password: yup.string().required().oneOf(
        [yup.ref('new_password'), null], 'Password must match')
});