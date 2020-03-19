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

//getProducts
export const GET_PRODUCTS_TABLE = {
    keys:['name','price','createdDate'],
    translations:{
        'name':'Name',
        'price':'Price',
        'createdDate':'created Date'
    }
};

//getProductsGroup
export const GET_PRODUCTS_GROUP_TABLE = {
    keys:['name','createdDate'],
    translations:{
        'name':'Name',
        'createdDate':'created Date'
    }
};
