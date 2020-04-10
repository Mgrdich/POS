import React, {createContext, useReducer} from 'react';
import {ChatDataReducer} from "./ChatReducers";

export const ChatContext = createContext<Array<any>>([]);

const ChatProvider: React.FC = (props) => { //tODO types to useReducer
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
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;