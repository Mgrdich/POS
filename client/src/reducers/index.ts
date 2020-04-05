import {combineReducers} from "redux";
import authReducer from "./authReducer";
import posReducer from "./posReducer";
import {IAuthReducer, IPOSReducer} from "../interfaces/redux/reducers";

interface combinedReducers {
    auth: IAuthReducer,
    pos: IPOSReducer
}

export default combineReducers<combinedReducers>({
    auth: authReducer,
    pos: posReducer
});