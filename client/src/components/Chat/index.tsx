import React from 'react';
import ChatComp from "./ChatComp";
import ChatProvider from "./ChatProvider";

const Chat:React.FC = () => {
    return (
        <ChatProvider>
            <ChatComp/>
        </ChatProvider>
    );
};

export default Chat;