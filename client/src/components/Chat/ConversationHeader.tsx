import React from 'react';
import {Avatar} from "@material-ui/core";

interface IConversationHeader {
    avatar: string;
}

const ConversationHeader: React.FC<IConversationHeader> = (props) => {
    return (
        <div className="conversationHeader">
            <Avatar className="avatar">
                {props.avatar}
            </Avatar>
        </div>
    );
};

export default ConversationHeader;