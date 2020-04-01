import React from 'react';
import ChatComp from "../../components/Chat/ChatComp";
import ChatProvider from "../../components/Chat/ChatProvider";

const Chat:React.FC = () => {
    return (
        <ChatProvider>
            <ChatComp/>
        </ChatProvider>
    );
};

export default Chat;