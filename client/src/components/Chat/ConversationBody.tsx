import React from 'react';
import Message from "./Message";

const ConversationBody:React.FC = () => {

    return (
        <div className="conversationBody">
            <Message  position="left"/>
            <Message position="right"/>
        </div>
    );
};

export default ConversationBody;