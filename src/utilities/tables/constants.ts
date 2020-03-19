//controllers users

//getUsers
export const GET_USERS_TABLE = { //TODO create an interface
    keys:['email','name','role'],
    translations:{
        'email':'Email',
        'name':'Name',
        'role':'Role',
    }
};

//getTables
export const GET_TABLES_TABLE = {
    keys:['number','status','createdDate'],
    translations:{
        'number':'Number',
        'status':'Status',
        'createdDate':'created Date'
    }
};