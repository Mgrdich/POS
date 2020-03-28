import React, {useEffect} from 'react';
import Message from "./Message";
import {socket} from "../../App";

const ConversationBody:React.FC = () => {

    useEffect(function () {
        socket.on('refresh messages',function (message:any) {
            console.log(message);
        });
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