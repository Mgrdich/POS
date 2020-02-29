import {InputField} from "../../interfaces/General";

export const createUsers : Array<InputField> = [
    {
        name: 'name',
        placeholder: 'name',
        validation: {
            required: "This Field is Required"
        }
    },
    {
        name: 'email',
        placeholder: 'email',
        validation: {
            required: "This Field is Required"
        }
    },
    {
        name: 'password',
        placeholder: 'password',
        type:'password',
        validation: {
            required: "This Field is Required",
            minLength: {
                value: 5,
                message: 'Password must have at least 5 characters'
            },
        }
    },
    {
        name: 'current_password',
        placeholder: 'current password',
        required: true,
        type:'password',
        validation: {
            required: "This Field is Required",
        }
    },
    {
        name: 'roles',
        placeholder: 'role',
        validation: {
            required: "This Field is Required",
        },
        type:'select',
        url:'/users/roles',
    }
];