import React, {useContext} from 'react';
import {ChatContext} from "./ChatProvider";
import ConversationHeader from "./ConversationHeader";
import ConversationBody from "./ConversationBody";
import ConversationFooter from "./ConversationFooter";
import Conditional from "../Reusable/Conditional";
import {useSelector} from "react-redux";

const Conversation: React.FC = () => {
    const [state] = useContext(ChatContext);
    const authorId = useSelector<any>(state => state.auth.user.id);
    const condition = state?.group?.members.includes(authorId);
    return (
        <>
            {
                state.user || state.group ? (<div className="conversation">
                    <ConversationHeader/>
                    <ConversationBody/>
                    {state.user ? <ConversationFooter/> : <Conditional condition={condition}>
                        <ConversationFooter/>
                    </Conditional>}
                </div>) : null
            }
        </>

    );
};

export default Conversation;