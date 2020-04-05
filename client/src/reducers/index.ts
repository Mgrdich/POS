import {combineReducers} from "redux";
import authReducer from "./authReducer";
import posReducer from "./posReducer";
import {IPOSReducer} from "../interfaces/redux/reducers";

interface combinedReducers {
    auth: any, //TODO
    pos: IPOSReducer
}

export default combineReducers<combinedReducers>({
    auth: authReducer,
    pos: posReducer
});