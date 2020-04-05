import {POS_TYPES} from "../actions/types";
import {IPOSReducer} from "../interfaces/redux/reducers";
import {hashingArray} from "../util/functions";

const initialState: IPOSReducer = {
    orders: [],
    tables: {
        data: [],
        isLoading: false
    },
    productsGroups: {
        data: {},
        isLoading: false
    },
    products: {
        data: {},
        isLoading: false
    },
    productsGroup: null,
    waiter: null,
    createdBy: null,
    orderId: null,
    isLoading: false,
    error: false
};

export default function (state: IPOSReducer = initialState, action: any): IPOSReducer {
    const {payload, type} = action;
    switch (type) {
        case POS_TYPES.FETCH_PRODUCTS_GROUPS:
            return {
                ...state,
                productsGroups: {
                    data: {
                        ...hashingArray(action.payload, "_id")
                    },
                    isLoading: false
                }
            };
        case POS_TYPES.FETCH_TABLES:
            return {
                ...state,
                tables: {
                    data: action.payload,
                    isLoading: false
                }
            };
        case POS_TYPES.FETCH_PRODUCTS:
            return {
                ...state,
                productsGroups: {
                    ...state.productsGroups,
                    data:{
                        ...state.productsGroups.data,
                        [action.payload.productGroupId]: {
                            products: [...action.payload.data],
                            ...state.productsGroups.data[action.payload.productGroupId]
                        }
                    }
                },
                products: {
                    data: [...action.payload.data],
                    isLoading: false
                }
            };
        case POS_TYPES.SET_ORDER_INFO:
            return {
                ...state,
                waiter: payload.waiter,
                createdBy: payload.createdBy,
                orderId: payload._id
            };
        case POS_TYPES.SET_ORDERS:
            return {
                ...state,
            };
        case POS_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: {
                    ...state.products,
                    data: action.payload.data,
                },
                productsGroup: action.payload.productGroupId
            };
        case POS_TYPES.SET_ERROR:
            return {
                ...state,
                error: true
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
                products: {
                    ...state.products,
                    isLoading: true
                }
            };
        case POS_TYPES.SET_LOADING_TABLES:
            return {
                ...state,
                tables: {
                    ...state.tables,
                    isLoading: true
                }
            };
        case POS_TYPES.SET_LOADING_INFO: {
            return {
                ...state
            }
        }
        default:
            return state;
    }
}