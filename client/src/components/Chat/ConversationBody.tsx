import React, {useContext, useEffect, useState} from 'react';
import Message from "./Message";
import {socket} from "../../App";
import {ChatContext} from "./ChatProvider";
import axios, {AxiosResponse} from "axios";
import {useSelector} from "react-redux";
import {CHAT_ACTIONS} from "./ActionsConfig";

const ConversationBody: React.FC = () => {
    const [state,dispatch] = useContext(ChatContext);
    const user: any = useSelector<any>(state => state.auth.user);
    useEffect(function () {
        socket.on('received message', function (message: any) {
            // dispatch({type:CHAT_ACTIONS.SET_MESSAGES,payload:message});
            console.log(message);
        });
    }, []);





    //FETCHING the Messages
    return (
        <div className="conversationBody">
            {
               state.messages.length && state.messages.map((item: any, index: number) => {
                    if (item.sender._id === user.id) {

                        return (
                            <Message position="right" name="me" key={item._id} message={item.message}/>
                        )
                    } else {
                        return (
                            <Message position="left" name={item.sender.name} key={item._id} message={item.message}/>
                        );
                    }
                })
            }
        </div>
    );
};

export default ConversationBody;