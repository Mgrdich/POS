import {POS_TYPES} from "../actions/types";
import {IPOSReducer} from "../interfaces/redux/reducers";
import {hashingArray} from "../util/functions";

const initialState: IPOSReducer = {
    orders: {
        data: [],
        isLoading: false
    },
    nonSubmittedOrders: [],
    tables: {
        data: [],
        isLoading: false
    },
    productsGroups: {
        data: {},
        isLoading: false,
        filterArray: []
    },
    products: {
        data: [],
        isLoading: false
    },
    productsGroup: null,
    waiter: {
        _id:'',
        name:''
    },
    createdBy: {
        _id: '',
        name: ''
    },
    Orders: {},
    tableHashed: {},
    isLoading: false,
    error: false
};

export default function (state: IPOSReducer = initialState, action: any): IPOSReducer {
    const {payload, type} = action;
    switch (type) {
        case POS_TYPES.CREATE_ORDER_INFO:
            return {
                ...state,
                waiter: payload.data.waiter,
                createdBy: payload.data.createdBy,
                Orders: {
                    ...state.Orders,
                    [payload.data._id]: {
                        orders: [],
                    }
                },
                tableHashed: {
                    ...state.tableHashed,
                    [action.payload.tableId]: payload.data._id
                },
                isLoading: false
            };
        case POS_TYPES.FETCH_ORDER_INFO:
            return {
                ...state,
                Orders: payload.Orders,
                tableHashed: payload.tableHashed,
                isLoading:false
            };
        case POS_TYPES.FETCH_PRODUCTS_GROUPS:
            return {
                ...state,
                productsGroups: {
                    data: {
                        ...hashingArray(action.payload, "_id")
                    },
                    isLoading: false,
                    filterArray: action.payload
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
                    data: {
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
                },
                productsGroup: action.payload.productGroupId
            };
        case POS_TYPES.FILTER_PRODUCTS:
            return {
                ...state,
                products: {
                    ...state.products,
                    data: action.payload
                }
            };
        case POS_TYPES.FILTER_PRODUCTS_GROUP:
            return {
                ...state,
                productsGroups: {
                    ...state.productsGroups,
                    filterArray: action.payload
                }
            };
        case POS_TYPES.SET_ORDER_INFO:
            return {
                ...state,
                waiter: payload.waiter,
            };
        case POS_TYPES.SET_ORDERS:
            return {
                ...state,
                Orders: {
                    ...state.Orders,
                    [payload.orderId]: {
                        ...state.Orders[payload.orderId],
                        orders: [],//TODO fill it,
                    }
                }
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
        case POS_TYPES.SET_WAITER:
            return {
              ...state,
              waiter:payload
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
        case POS_TYPES.SET_LOADING_ORDERS:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    isLoading: true
                }
            };
        case POS_TYPES.SET_LOADING_INFO: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state;
    }
}