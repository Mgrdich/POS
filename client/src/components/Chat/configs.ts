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
        url: '/api/users',
    },
    {
        name: 'members',
        placeholder: 'Members',
        type: 'select',
        url: '/api/users',
    }
];

export const createGroupChatVal: Array<InputField> = [ //TODO put a validation

];