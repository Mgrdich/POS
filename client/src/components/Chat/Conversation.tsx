import React, {useContext, useEffect, useState} from 'react';
import {ChatContext} from "./ChatProvider";
import ConversationHeader from "./ConversationHeader";
import ConversationBody from "./ConversationBody";
import ConversationFooter from "./ConversationFooter";
import Conditional from "../Reusable/Conditional";
import {useSelector} from "react-redux";

const Conversation: React.FC = () => {
    const [state] = useContext(ChatContext);
    const authorId = useSelector<any>(state => state.auth.user.id);
    const [condition,setCondition] = useState<boolean>(false);
    useEffect(function () {
        if(state.group && state.group.members){
            setCondition(state.group.members.some((item:{_id:string,name:string})=>item._id===authorId))
        }
    },[state.group]);

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