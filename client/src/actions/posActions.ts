import {ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";

type actionVoid = ActionCreator<ThunkAction<void, any, any, AnyAction>>;

export const openOrder: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.put('/orders');
        dispatch({type: POS_TYPES.SET_ORDER_INFO, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR})
    }
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
        const res: AxiosResponse = await axios.get('/orders/tables');
        dispatch({type: POS_TYPES.FETCH_PRODUCTS_GROUPS, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};