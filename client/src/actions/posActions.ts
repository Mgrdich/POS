import {ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";

export const openOrder: ActionCreator<ThunkAction<void, any, any, AnyAction>> = () => async (dispatch: Dispatch) => {
    try {
        const res:AxiosResponse = await axios.put('/orders');
        dispatch({type:POS_TYPES.SET_ORDER_INFO,payload:res.data})
    } catch (err) {
        dispatch({type:POS_TYPES.SET_ERROR})
    }
};

export const fetchTables : ActionCreator<ThunkAction<void, any, any, AnyAction>> = () => async (dispatch: Dispatch) =>  {
    try {
        const res:AxiosResponse = await axios.get('/orders/tables');
        dispatch({type:POS_TYPES.SET_TABLES,payload:res.data})
    } catch (err) {
        dispatch({type:POS_TYPES.SET_ERROR});
    }
};