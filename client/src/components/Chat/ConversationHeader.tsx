import React, {useContext} from 'react';
import {Avatar} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";


const ConversationHeader: React.FC = () => {
    const [state,dispatch] = useContext(ChatContext);
    const {user} = state;
    return (
        <div className="conversationHeader">
            <Avatar className="avatar">
                {user.name[0]}
            </Avatar>

        </div>
    );
};

export default ConversationHeader;