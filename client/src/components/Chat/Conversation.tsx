import React, {useContext} from 'react';
import {ChatContext} from "./ChatProvider";
import ConversationHeader from "./ConversationHeader";
import ConversationBody from "./ConversationBody";
import ConversationFooter from "./ConversationFooter";

const Conversation: React.FC = () => {
    const [state] = useContext(ChatContext);
    return (
        <>
        {
            state.user ? (<div className="conversation">
                <ConversationHeader/>
                <ConversationBody/>
                <ConversationFooter/>
            </div>) : null
        }
        </>

    );
};

export default Conversation;