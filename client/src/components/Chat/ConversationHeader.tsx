import React, {useContext} from 'react';
import {Avatar} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";

interface IConversationHeader {
    avatar: string;
}

const ConversationHeader: React.FC<IConversationHeader> = (props) => {
    const [state,dispatch] = useContext(ChatContext);
    console.log(state);
    return (
        <div className="conversationHeader">
            <Avatar className="avatar">
                {props.avatar}
            </Avatar>
        </div>
    );
};

export default ConversationHeader;