import {InputField} from "../../interfaces/General";

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

export const createGroupChatVal: Array<InputField> = [ //TODO put a validation

];