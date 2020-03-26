import {setAuthToken} from "../util/redux";
import jwt_decode from "jwt-decode";
import {Action, ActionCreator, AnyAction, Dispatch} from 'redux';
import {ThunkAction} from "redux-thunk";
import history from "../util/history";
import {SET_CURRENT_USER} from "./types";

type action = ActionCreator<Action>;

export const setCurrentUser: action = function (decoded: any) {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


export const loginUser: ActionCreator<ThunkAction<void, any, any, AnyAction>> = (userData: any) => (dispatch: Dispatch) => {
    const {token} = userData.data;
    //creating the token in ls
    localStorage.setItem('token', token); //TODO Replace it with unique shit
    //set Token to Auth Header
    setAuthToken(token);
    //decode the token
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

    //socket connection



    history.push('/dashboard');
};


export const logOutUser: ActionCreator<any> = () => (dispatch: Dispatch) => {

    if (localStorage.token) {
        localStorage.removeItem('token');
    }
    setAuthToken();
    dispatch(setCurrentUser({}));
};
