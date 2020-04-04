/*
* Action Types
* Every Action file should be separated in its own Object
*
* */

export const AUTH_TYPES: any = { //TODO interfaces are needed
    SET_CURRENT_USER: "CURRENT_USER"
};

export const POS_TYPES: any = {
    SET_ORDER_INFO:"ORDER_INFO",
    SET_ORDERS: "ORDERS",
    SET_PRODUCTS_GROUPS: "PRODUCTS_GROUPS",
    SET_PRODUCTS_GROUP: "PRODUCTS_GROUP",
    SET_PRODUCTS:"PRODUCTS",
    SET_LOADING:"LOADING_INFO",
    SET_LOADING_PRODUCTS_GROUPS:"LOADING_PRODUCTS_GROUPS",
    SET_LOADING_PRODUCTS:"LOADING_PRODUCTS",
};