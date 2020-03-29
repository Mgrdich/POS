import {CHAT_ACTIONS} from "./ActionsConfig";

export const ChatDataReducer = function (state: any, action: any) {
    switch (action.type) {

        case CHAT_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CHAT_ACTIONS.SET_USERS: //not be used
            return {
                ...state,
                user: action.payload,
            };
        case CHAT_ACTIONS.SET_MESSAGES:
            return  {
                ...state,
                messages:action.payload
            };
        case CHAT_ACTIONS.SET_MESSAGE: //tODO if not used delete
            return  {
                ...state,
                messages:[...state.messages,...action.payload]
            };
        case CHAT_ACTIONS.PREPEND_MESSAGES:
            return {
              ...state,
              messages:[...state.messages,...action.payload]
            };
        default:
            throw new Error();
    }
};
