import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";
import {IState} from "../reducers";
import {hashingArray} from "../util/functions";

type actionVoid = ActionCreator<ThunkAction<void, any, any, AnyAction>>;
type action = ActionCreator<Action>;

export const fetchOrders: actionVoid = () => async (dispatch: Dispatch, getState: () => IState) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.get('/orders');
        let tableHashed: any = {};
        let Orders:any = {};
        for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i];
            tableHashed[item.table] = item._id;
            Orders[item._id] = {
                orders:[]
            }
        }
        dispatch({type: POS_TYPES.FETCH_ORDER_INFO,payload:{tableHashed,Orders}});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const openOrder: actionVoid = (tableId: string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.put('/orders', {
            waiter: pos.waiter,
            table: tableId
        });
        dispatch({type: POS_TYPES.FETCH_ORDER_INFO, payload: {data: res.data, tableId}});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const setUnSubmittedOrder: action = (productId,productGroupId) => {
    return {
        type:POS_TYPES.SET_UN_SUBMITTED_ORDERS,
        payload:{productId,productGroupId}
    }
};

export const setWaiter: action = (user:{_id:string,name:string}) => {
    return {
        type: POS_TYPES.SET_WAITER,
        payload: user
    };
};

export const fetchTables: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_TABLES});
        const res: AxiosResponse = await axios.get('/orders/tables');
        dispatch({type: POS_TYPES.FETCH_TABLES, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const fetchProductsGroups: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_PRODUCTS_GROUPS});
        const res: AxiosResponse = await axios.get('/orders/products-groups');
        dispatch({type: POS_TYPES.FETCH_PRODUCTS_GROUPS, payload: hashingArray(res.data,"_id")});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const fetchSelectProducts = (id: string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    const productsGroups: any = pos.productsGroups;
    if (productsGroups.data[id].products) {
        return dispatch({
            type: POS_TYPES.SET_PRODUCTS, payload: {
                data: productsGroups.data[id].products,
                productGroupId: id
            }
        });
    }
    try {
        dispatch({type: POS_TYPES.SET_LOADING_PRODUCTS});
        const products = await axios.get(`/orders/products/${id}`);
        dispatch({
            type: POS_TYPES.FETCH_PRODUCTS, payload: {
                data: hashingArray(products.data.products,"_id"),
                productGroupId: id
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};