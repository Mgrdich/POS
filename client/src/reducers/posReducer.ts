import {POS_TYPES} from "../actions/types";
import {IPOSReducer} from "../interfaces/redux/reducers";

const initialState: IPOSReducer = {
    orders: {
        _id:null,
        isLoading: false
    },
    nonSubmittedOrders:{},
    tables: {
        data: [],
        isLoading: false
    },
    productsGroups: {
        data: {},
        isLoading: false,
    },
    products: {
        data: {},
        isLoading: false,
    },
    productsGroup: null,
    waiter: {
        _id:'',
        name:''
    },
    createdBy: {
        _id: '',
        name: ''
    }, //TODO to be removed later
    Orders: {},
    tableHashed: {},
    groupActions:{},
    isLoading: false,
    error: false
};

export default function (state: IPOSReducer = initialState, action: any): any {
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
                tableHashed: { //table Id -> OrderId
                    ...state.tableHashed,
                    [action.payload.tableId]: payload.data._id
                },
                isLoading: false
            };
        case POS_TYPES.SUBMIT_TABLE_ORDER:
            return {
                ...state,
                Orders: {
                    ...state.Orders,
                    [payload.orderId]: {
                        ...state.Orders[payload.orderId],
                        ...payload.data
                    }
                },
                nonSubmittedOrders: {}
            };
        case POS_TYPES.FETCH_ORDERS_INFO:
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
                    data: action.payload,
                    isLoading: false,
                }
            };
        case POS_TYPES.FETCH_TABLE_ORDER:
            return {
                ...state,
                Orders: {
                    ...state.Orders,
                    [payload.orderId]: payload.data
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
                            products: action.payload.data,
                            ...state.productsGroups.data[action.payload.productGroupId]
                        }
                    }
                },
                products: {
                    data:action.payload.data,
                    isLoading: false,
                },
                productsGroup: action.payload.productGroupId
            };
        case POS_TYPES.SET_UN_SUBMITTED_ORDERS:
            let nonSubmittedOrders = (state.nonSubmittedOrders) ? state.nonSubmittedOrders : {};
            let id = action.payload.productId;
            let orderId = action.payload.orderId;
            let quantity:number = 1;
            if(nonSubmittedOrders[orderId] && nonSubmittedOrders[orderId][id]  ) {
                quantity = nonSubmittedOrders[orderId][id].quantity+1;
            }
            return {
              ...state,
                nonSubmittedOrders:{
                  ...state.nonSubmittedOrders,
                    [orderId]:{
                      ...nonSubmittedOrders[orderId],
                        [id]:{
                            _id:id,
                            productsGroupId: action.payload.productGroupId,
                            quantity:quantity,
                        }
                    },
                },
                groupActions: {
                    ...state.groupActions,
                    [orderId]: {
                        ...state.groupActions[orderId],
                        [id]: true
                    }
                }
            };
        case POS_TYPES.SET_ORDER_QUANTITY:
            return {
              ...state,
                nonSubmittedOrders: {
                    ...state.nonSubmittedOrders,
                    [payload.orderId]: {
                        ...state.nonSubmittedOrders[payload.orderId],
                        [payload.productId]: {
                            ...state.nonSubmittedOrders[payload.orderId][payload.productId],
                            quantity: payload.quantity
                        }
                    }
                }
            };
        case POS_TYPES.DELETE_GROUP_ACTIONS:
            return {
                ...state,
                nonSubmittedOrders: {
                    ...state.nonSubmittedOrders,
                    [payload.orderId]: {
                        ...payload.nonSubmittedOrders
                    }
                },
                groupActions:{
                    ...state.groupActions,
                    [payload.orderId]:{
                        ...state.groupActions[payload.orderId],
                        ...payload.groupOrderActions
                    }
                }
            };
        case POS_TYPES.SET_GROUP_ACTIONS:
            return {
                ...state,
                groupActions: {
                    ...state.groupActions,
                    [payload.orderId]: {
                        ...state.groupActions[payload.orderId],
                        [payload.productId]:payload.check
                    }
                }
            };
        case POS_TYPES.SET_ALL_GROUP_ACTIONS:
            return {
                ...state,
                groupActions:{
                    ...state.groupActions,
                    [payload.orderId]:{
                        ...payload.data
                    }
                }
            };
        case POS_TYPES.SET_ORDER_INFO:
            return {
                ...state,
                orders: {
                    _id: payload,
                    isLoading: false
                }
            };
        case POS_TYPES.SET_ORDERS:
            return {
                ...state,
                Orders: {
                    ...state.Orders,
                    [payload.orderId]: {
                        ...state.Orders[payload.orderId],
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