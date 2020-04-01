import React, {useContext} from 'react';
import {Avatar} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";


const ConversationHeader: React.FC = () => {
    const [state] = useContext(ChatContext);
    const {user, group} = state;
    return (
        <div className="conversationHeader">
            <div>
                <Avatar className="avatar">
                    {user ? user.name[0] : group.name[0]}
                </Avatar>
                <span className="email">
                    {user ? user.email : group.name} {user ? `(${user.name})` : ''}
                </span>
            </div>
        </div>
    );
};

export default ConversationHeader;