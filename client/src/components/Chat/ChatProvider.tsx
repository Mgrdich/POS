import React, {createContext, useReducer} from 'react';
import {ChatDataReducer} from "./ChatReducers";

export const ChatContext = createContext<Array<any>>([]);

const ChatProvider:React.FC = (props) => {
    const [state,dispatch] = useReducer<any>(ChatDataReducer,{
        users:[],
        user:{},
        isLoading:true
    });

    return (
        <ChatContext.Provider value={[state,dispatch]}>
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;