import {POS_TYPES} from "../actions/types";
import {IPOSReducer} from "../interfaces/redux/reducers";

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
    isLoading: false,
    error: false
};

export default function (state: IPOSReducer = initialState, action: any) {
    const {payload, type} = action;
    switch (type) {
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
        case POS_TYPES.SET_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}