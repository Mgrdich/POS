import React from 'react';
import Message from "./Message";

const ConversationBody:React.FC = () => {
    return (
        <div className="conversationBody">
            <Message avatar="M" position="left"/>
            <Message avatar="M" position="right"/>
        </div>
    );
};

export default ConversationBody;