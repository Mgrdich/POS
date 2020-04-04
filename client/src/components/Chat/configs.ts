import {InputField} from "../../interfaces/General";
import * as yup from "yup";

export const createGroupChat: Array<InputField> = [
    {
        name: 'name',
        placeholder: 'Group Name',
    },
    {
        name: 'admins',
        placeholder: 'Admins',
        type: 'select',
        url: '/api/users', //TODO fetch it once an give it to him
        ignoreNone:true,
        multiple:true
    },
    {
        name: 'members',
        placeholder: 'Members',
        type: 'select',
        url: '/api/users',
        ignoreNone:true,
        multiple: true
    }
];

export const editGroupChat: Array<InputField> = [
    {
        name: 'name',
        placeholder: 'Group Name',
    },
    {
        name: 'admins',
        placeholder: 'Admins',
        type: 'select',
        url: '/api/users', //TODO fetch it once an give it to him
        ignoreNone:true,
        multiple:true
    },
    {
        name: 'members',
        placeholder: 'Members',
        type: 'select',
        url: '/api/users',
        ignoreNone:true,
        multiple: true
    }
];

export const createGroupChatVal =   yup.object().shape({
    name: yup.string().required(),
    admins: yup.array(),
    members:yup.array(),
});
export const editGroupChatVal =   yup.object().shape({
    name: yup.string().required(),
    admins: yup.array(),
    members:yup.array(),
});