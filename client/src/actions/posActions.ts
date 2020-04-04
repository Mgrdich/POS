import {ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";

export const openOrder: ActionCreator<ThunkAction<void, any, any, AnyAction>> = () => async (dispatch: Dispatch) => {
    try {
        const res:AxiosResponse = await axios.put('/orders');
        dispatch({type:POS_TYPES.SET_ORDER_INFO,payload:res})
    } catch (err) {
        dispatch({type:POS_TYPES.SET_ERROR})
    }
};