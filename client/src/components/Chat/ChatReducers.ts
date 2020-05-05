import {CHAT_ACTIONS} from "./ActionsConfig";

export const ChatDataReducer = function (state: any, action: any) {
    switch (action.type) {

        case CHAT_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                group:null
            };
        case CHAT_ACTIONS.SET_USERS: //not be used
            return {
                ...state,
                user: action.payload,
                group: null
            };
        case CHAT_ACTIONS.SET_GROUP:
            return {
                ...state,
                group: action.payload,
                user: null
            };
        case CHAT_ACTIONS.SET_GROUP_MORE:
            return {
              ...state,
                group:{
                    ...state.group,
                    admins:[...action.payload.admins],
                    members:[...action.payload.members]
                }
            };
        case CHAT_ACTIONS.SET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        case CHAT_ACTIONS.SET_MESSAGE: //TODO if not used delete
            return  {
                ...state,
                messages:[...state.messages,{...action.payload}]
            };
        case CHAT_ACTIONS.PREPEND_MESSAGES:
            return {
              ...state,
              messages:[...state.messages,...action.payload]
            };
        case CHAT_ACTIONS.REFETCH:
            return {
                ...state,
                fetch: !state.fetch,
            };

        case CHAT_ACTIONS.DELETE_GROUP :
            return {
                ...state, users: [],
                user: null,
                messages: [],
                isLoading: true,
                group: null,
                fetch: false,
            };
        default:
            throw new Error();
    }
};
