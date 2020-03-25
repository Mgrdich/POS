import React from 'react';
import ChatProvider from "./ChatProvider";
import ChatComp from "./ChatComp";

const Chat = () => {
    return (
        <ChatProvider>
            <ChatComp/>
        </ChatProvider>
    );
};

export default Chat;