import React, {useEffect} from 'react';
import Message from "./Message";
import io from "socket.io-client";

const socket = io();

const ConversationBody:React.FC = () => {

    useEffect(function () {
        return () => {

        }
    },[]);

    //FETCHING the Messages
    return (
        <div className="conversationBody">
            <Message  position="left"/>
            <Message position="right"/>
        </div>
    );
};

export default ConversationBody;