/*
* Action Types
* Every Action file should be separated in its own Object
*
* */

export const AUTH_TYPES: any = { //TODO interfaces are needed
    SET_CURRENT_USER: "CURRENT_USER"
};

interface IPOS_TYPES {
    SUBMIT_TABLE_ORDER:"SUBMIT_TABLE_ORDER",
    CREATE_ORDER_INFO:"CREATE_ORDER_INFO",
    FETCH_TABLES:"FETCH_TABLES",
    FETCH_PRODUCTS_GROUPS: "FETCH_PRODUCTS_GROUPS",
    FETCH_TABLE_ORDER:"FETCH_TABLE_ORDER",
    FETCH_PRODUCTS:"FETCH_PRODUCTS",
    FETCH_ORDERS_INFO:"FETCH_ORDERS_INFO",
    SET_GROUP_ACTIONS:"SET_GROUP_ACTIONS",
    SET_PRODUCTS:"SET_PRODUCTS",
    SET_ORDER_INFO:"SET_ORDER_INFO",
    SET_ORDERS: "ORDERS",
    SET_UN_SUBMITTED_ORDERS:"SET_UN_SUBMITTED_ORDERS",
    SET_PRODUCTS_GROUP: "PRODUCTS_GROUP",
    SET_WAITER:"SET_WAITER",
    SET_LOADING:"LOADING_INFO",
    SET_LOADING_INFO:"LOADING_INFO",
    SET_LOADING_PRODUCTS_GROUPS:"LOADING_PRODUCTS_GROUPS",
    SET_LOADING_PRODUCTS:"LOADING_PRODUCTS",
    SET_LOADING_TABLES:"LOADING_TABLES",
    SET_LOADING_ORDERS:"SET_LOADING_ORDERS",
    SET_ERROR:"ERROR"
}

export const POS_TYPES: IPOS_TYPES = {
    SUBMIT_TABLE_ORDER: "SUBMIT_TABLE_ORDER",
    CREATE_ORDER_INFO: "CREATE_ORDER_INFO",
    FETCH_TABLES: "FETCH_TABLES",
    FETCH_PRODUCTS_GROUPS: "FETCH_PRODUCTS_GROUPS",
    FETCH_TABLE_ORDER: "FETCH_TABLE_ORDER",
    FETCH_PRODUCTS: "FETCH_PRODUCTS",
    FETCH_ORDERS_INFO: "FETCH_ORDERS_INFO",
    SET_GROUP_ACTIONS: "SET_GROUP_ACTIONS",
    SET_PRODUCTS: "SET_PRODUCTS",
    SET_ORDER_INFO: "SET_ORDER_INFO",
    SET_ORDERS: "ORDERS",
    SET_UN_SUBMITTED_ORDERS: "SET_UN_SUBMITTED_ORDERS",
    SET_PRODUCTS_GROUP: "PRODUCTS_GROUP",
    SET_WAITER: "SET_WAITER",
    SET_LOADING: "LOADING_INFO",
    SET_LOADING_INFO: "LOADING_INFO",
    SET_LOADING_PRODUCTS_GROUPS: "LOADING_PRODUCTS_GROUPS",
    SET_LOADING_PRODUCTS: "LOADING_PRODUCTS",
    SET_LOADING_TABLES: "LOADING_TABLES",
    SET_LOADING_ORDERS: "SET_LOADING_ORDERS",
    SET_ERROR: "ERROR"
};