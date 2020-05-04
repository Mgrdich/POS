import {tableTypesNormlizer} from "../constants/enums";

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
    keys:['number','name','status',{name:'createdAt',type:tableTypesNormlizer.Date}],
    translations:{
        'name':'Name',
        'number':'Number',
        'status':'Status',
        'createdAt':'created At'
    }
};

export const GET_TABLES_TABLE_STATUS = {
    keys:['name','number','status',{name:'createdAt',type:tableTypesNormlizer.Date}],
    translations:{
        'name':'Name',
        'number':'Number',
        'createdAt':'created At',
        'status':'Status'
    }
};

//getProducts
export const GET_PRODUCTS_TABLE = {
    keys:['name','price',{name:'group',alias:'name'},{name:'createdAt',type:tableTypesNormlizer.Date}], //TODO make it recursive
    translations:{
        'name':'Name',
        'price':'Price',
        'group':'Product Group',
        'createdAt':'created At'
    },
};

//getProductsGroup
export const GET_PRODUCTS_GROUP_TABLE = {
    keys:['name',{name:'createdAt',type:tableTypesNormlizer.Date}],
    translations:{
        'name':'Name',
        'createdAt':'created At'
    }
};
