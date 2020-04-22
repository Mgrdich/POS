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
    keys:['number','name','status','createdAt'],
    translations:{
        'name':'Name',
        'number':'Number',
        'status':'Status',
        'createdAt':'created At'
    }
};

export const GET_TABLES_TABLE_STATUS = {
    keys:['name','number','createdAt'],
    translations:{
        'name':'Name',
        'number':'Number',
        'createdAt':'created At'
    }
};

//getProducts
export const GET_PRODUCTS_TABLE = {
    keys:['name','price',{name:'group',alias:'name'},'createdAt'], //TODO make it recursive
    translations:{
        'name':'Name',
        'price':'Price',
        'group':'Product Group',
        'createdAt':'created At'
    },
};

//getProductsGroup
export const GET_PRODUCTS_GROUP_TABLE = {
    keys:['name','createdDate'],
    translations:{
        'name':'Name',
        'createdAt':'created At'
    }
};
