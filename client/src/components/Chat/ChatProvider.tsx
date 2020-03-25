import React, {createContext, useReducer} from 'react';
import {ChatDataReducer} from "./ChatReducers";

export const ChatContext = createContext<Array<any>>([]);

const ChatProvider:React.FC = (props) => { //tODO types to useReducer
    const [state,dispatch] = useReducer<any>(ChatDataReducer,{
        users:[],
        user:null,
        isLoading:true
    });

    return (
        <ChatContext.Provider value={[state,dispatch]}>
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;