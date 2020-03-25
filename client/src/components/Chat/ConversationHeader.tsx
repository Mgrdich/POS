import React, {useContext} from 'react';
import {Avatar} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";


const ConversationHeader: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const {user} = state;
    return (
        <div className="conversationHeader">
            <div>
                <Avatar className="avatar">
                    {user.name[0]}
                </Avatar>
                <span className="email">{user.email}</span>
            </div>
        </div>
    );
};

export default ConversationHeader;