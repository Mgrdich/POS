import {AUTH_TYPES} from "../actions/types";
import {isEmpty} from "../util/functions";
import {IAuthReducer} from "../interfaces/redux/reducers";

const initialState: IAuthReducer = {
    isAuthenticated: false,
    user: {}
};

export default function (state: IAuthReducer = initialState, action: any) {
    switch (action.type) {
        case AUTH_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated:!isEmpty(action.payload),
                user: action.payload
            };
        default:
            return state;
    }
}