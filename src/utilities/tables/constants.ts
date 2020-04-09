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
    keys:['number','status','role','createdDate'],
    translations:{
        'number':'Number',
        'status':'Status',
        'role':'Role',
        'createdDate':'created Date'
    }
};

//getProducts
export const GET_PRODUCTS_TABLE = {
    keys:['name','price',{name:'group',alias:'name'},'createdDate'], //TODO make it recursive
    translations:{
        'name':'Name',
        'price':'Price',
        'group':'Product Group',
        'createdDate':'created Date'
    },
};

//getProductsGroup
export const GET_PRODUCTS_GROUP_TABLE = {
    keys:['name','createdDate'],
    translations:{
        'name':'Name',
        'createdDate':'created Date'
    }
};
