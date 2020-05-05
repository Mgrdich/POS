import React, {useContext, useEffect, useState} from 'react';
import Message from "./Message";
import {socket} from "../../App";
import {ChatContext} from "./ChatProvider";
import {useSelector} from "react-redux";
import {CHAT_ACTIONS} from "./ActionsConfig";
import axios, {AxiosResponse} from "axios";
import {useScrollDown} from "../Hooks/useScrollDown";


const ConversationBody: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const user: any = useSelector<any>(state => state.auth.user);
    const [listContainer] =  useScrollDown(state.messages);
    const [groupId,setGroupId] = useState(!!state.group?state.group._id:false);

    
    useEffect(function () {
        if(state.group && state.group._id!==groupId){
            setGroupId(state.group._id);
        }
        if(!state.group){
            setGroupId(false);
        }
    },[state.group]);

    useEffect(function () {
        socket.on('received message', function (message: any) {
            dispatch({type: CHAT_ACTIONS.SET_MESSAGE, payload: message});
        });
    }, [dispatch]);

    useEffect(function () {
        if (groupId || state.user) {
            let url: string;
            if (groupId) {
                url = `/group-chat/${groupId}`;
            } else {
                url = `/chat/get-chat/${state.user._id}`;
            }
            axios.get(url)
                .then(function (res: AxiosResponse) {
                    if (res.data) {
                        if (res.data.admins && res.data.members) {
                            dispatch({
                                type: CHAT_ACTIONS.SET_GROUP_MORE,
                                payload: {admins: res.data.admins, members: res.data.members}
                            });
                        }
                        if (res.data.messages?.length) {
                            dispatch({type: CHAT_ACTIONS.SET_MESSAGES, payload: res.data.messages});
                        } else {
                            dispatch({type: CHAT_ACTIONS.SET_MESSAGES, payload: []})
                        }
                    }
                });
        }

    }, [state.user,groupId,dispatch]);

    return (
        <div className="conversationBody" ref={listContainer}>
            {
                state.messages.length ? state.messages.map((item: any, index: number) => {
                    if (item.sender._id === user.id) {

                        return (
                            <Message position="right" name="me" key={item._id} message={item.message}/>
                        )
                    } else {
                        return (
                            <Message position="left" name={item.sender.name} key={item._id} message={item.message}/>
                        );
                    }
                }) :<div className='empty-message-container'><h1>No Messages yet</h1></div>
            }
        </div>
    );
};

export default ConversationBody;