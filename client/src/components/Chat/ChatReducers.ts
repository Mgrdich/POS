import {CHAT_ACTIONS} from "./ActionsConfig";

export const ChatDataReducer = function (state: any, action: any) {
    switch (action.type) {
        case CHAT_ACTIONS.SET_USER:
            return {
                ...state,
                user: {name:'boghos'},
            };
        default:
            throw new Error();
    }
};
