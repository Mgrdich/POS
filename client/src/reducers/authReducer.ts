import {AUTH_TYPES} from "../actions/types";
import {isEmpty} from "../util/functions";

interface IAuthReducer {
    isAuthenticated: boolean;
    user: any; //TODO typed
}

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