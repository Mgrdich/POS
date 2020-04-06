/*
* Action Types
* Every Action file should be separated in its own Object
*
* */

export const AUTH_TYPES: any = { //TODO interfaces are needed
    SET_CURRENT_USER: "CURRENT_USER"
};

export const POS_TYPES: any = {
    FETCH_TABLES:"FETCH_TABLES",
    FETCH_PRODUCTS_GROUPS: "FETCH_PRODUCTS_GROUPS",
    FETCH_PRODUCTS:"FETCH_PRODUCTS",
    FETCH_ORDER_INFO:"FETCH_ORDER_INFO",
    FILTER_PRODUCTS:"FILTER_PRODUCTS",
    FILTER_PRODUCTS_GROUP:"FILTER_PRODUCTS_GROUP",
    SET_PRODUCTS:"SET_PRODUCTS",
    SET_ORDER_INFO:"ORDER_INFO",
    SET_ORDERS: "ORDERS",
    SET_PRODUCTS_GROUP: "PRODUCTS_GROUP",
    SET_LOADING:"LOADING_INFO",
    SET_LOADING_INFO:"LOADING_INFO",
    SET_LOADING_PRODUCTS_GROUPS:"LOADING_PRODUCTS_GROUPS",
    SET_LOADING_PRODUCTS:"LOADING_PRODUCTS",
    SET_LOADING_TABLES:"LOADING_TABLES",
    SET_ERROR:"ERROR"
};