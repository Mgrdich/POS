

export const createUsers : Array<any> = [
    {
        name: 'name',
        placeholder: 'name',
        required: true,
    }, {
        name: 'email',
        placeholder: 'email',
        required: true,
    }, {
        name: 'password',
        placeholder: 'password',
        required: true,
        type:'password'
    }, {
        name: 'current_password',
        placeholder: 'current password',
        required: true,
        type:'password',
    }, {
        name: 'roles',
        placeholder: 'role',
        required: true,
        type:'select',
        url:'/users/roles',
    }
];