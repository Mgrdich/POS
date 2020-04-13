import React, {createContext, useReducer} from 'react';
import {ChatDataReducer} from "./ChatReducers";
import {IChatProvider} from "../../interfaces/Chat";

export const ChatContext = createContext<Array<any>>([]);

const ChatProvider: React.FC <IChatProvider> = (props) => { //tODO types to useReducer
    const {children} = props;
    const [state, dispatch] = useReducer<any>(ChatDataReducer, {
        users: [],
        user: null,
        messages: [],
        isLoading: true,
        group: null,
        fetch: false,
    });

    return (
        <ChatContext.Provider value={[state, dispatch]}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;