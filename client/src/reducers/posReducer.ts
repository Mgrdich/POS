import {POS_TYPES} from "../actions/types";

interface IPOSReducer {
    orders: Array<any>; //TODO type array typed
    productsGroups: Array<any>;
    productsGroup: string | null; //id
    products: Array<any>;
    waiter: any; // id name
    createdBy: any // id name
}

const initialState: IPOSReducer = {
    orders: [],
    products: [],
    productsGroups: [],
    productsGroup: null,
    waiter: null,
    createdBy:null
};

export default function (state: IPOSReducer = initialState, action: any) {
    switch (action.type) {
        case POS_TYPES.SET_ORDER_INFO:
            return {
                ...state,
            };
        case POS_TYPES.SET_ORDERS:
            return {
                ...state,
            };
        case POS_TYPES.SET_PRODUCTS:
            return {
                ...state,
            };
        case POS_TYPES.SET_PRODUCTS_GROUPS:
            return {
                ...state,
            };

        case POS_TYPES.SET_PRODUCTS_GROUP:
            return {
                ...state,
            };
        default:
            return state;
    }
}