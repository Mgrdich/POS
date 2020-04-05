import {combineReducers} from "redux";
import authReducer from "./authReducer";
import posReducer from "./posReducer";
import {IAuthReducer, IPOSReducer} from "../interfaces/redux/reducers";

export interface IState {
    auth: IAuthReducer,
    pos: IPOSReducer
}

export default combineReducers<IState>({
    auth: authReducer,
    pos: posReducer
});