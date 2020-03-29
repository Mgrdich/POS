import React, {useContext, useEffect, useState} from 'react';
import Message from "./Message";
import {socket} from "../../App";
import {ChatContext} from "./ChatProvider";
import axios, {AxiosResponse} from "axios";
import {useSelector} from "react-redux";

const ConversationBody: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const [msg, setMsg] = useState<Array<any>>([]);
    const user: any = useSelector<any>(state => state.auth.user);

    useEffect(function () {
        socket.on('refresh messages', function (message: any) {
            console.log(message);
        });
    }, []);


    useEffect(function () {
        axios.get(`/chat/get-chat/${state.user._id}`)
            .then(function (res: AxiosResponse) {
            if (res.data && res.data.messages?.length) {
                setMsg([...msg, ...res.data.messages]);
            }
        });
    }, []);


    //FETCHING the Messages
    return (
        <div className="conversationBody">
            {
               msg.length && msg.map((item: any, index: number) => {
                    if (item.sender === user.id) {
                        return (
                            <Message position="right" name="me" key={item._id} message={item.message}/>
                        )
                    } else {
                        return (
                            <Message position="left" name={item.sender} key={item._id} message={item.message}/>
                        );
                    }
                })
            }
        </div>
    );
};

export default ConversationBody;