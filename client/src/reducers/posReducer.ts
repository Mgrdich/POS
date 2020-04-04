import {POS_TYPES} from "../actions/types";

interface IPOSReducer {
    orders: Array<any>; //TODO type array typed
    productsGroups: {
        data: {
            [key: string]: {
                _id: string;
                products: Array<any> | null;
                name: string;
                isLoading: boolean; //for products Fetch
            };
        },
        isLoading: boolean; //for Products Group
    };
    productsGroup: string | null; //id
    waiter: any; // id name
    createdBy: any // id name
    orderId: string | null;
    isLoading: boolean; //info Group
}

const initialState: IPOSReducer = {
    orders: [],
    productsGroups: {
        data: {},
        isLoading: false
    },
    productsGroup: null,
    waiter: null,
    createdBy: null,
    orderId: null,
    isLoading: false
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
                productsGroups: {
                    ...action.payload,
                    isLoading: false
                }
            };
        case POS_TYPES.SET_PRODUCTS_GROUP:
            return {
                ...state,
            };
        case POS_TYPES.SET_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case POS_TYPES.SET_LOADING_PRODUCTS_GROUPS:
            return {
                ...state,
                productsGroups: {
                    ...state.productsGroups,
                    isLoading: true
                }
            };
        case POS_TYPES.SET_LOADING_PRODUCTS:
            return {
                ...state,
                //loading
            };
        default:
            return state;
    }
}