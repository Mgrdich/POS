import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ComponentLoader from "../Reusable/ComponentLoader";
import {ChatContext} from "./ChatProvider";
import {CHAT_ACTIONS} from "./ActionsConfig"
import {IChatList} from "../../interfaces/Chat";


const ChatList: React.FC<IChatList> = (props) => {
    const {filter, data: users, isLoading} = props;
    const [data, setData] = useState<Array<any>>();
    const dispatch = useContext(ChatContext)[1];

    useEffect(function () {
        if (!isLoading) {
            setData(users);
        }
    }, [isLoading,users]);

    useEffect(function () {
        if (!isLoading) {
            if (filter === '') {
                return setData(users);
            }
            const filteredUsers:Array<any> = users.filter((item: any) => item.name.toLowerCase().includes(filter.toLowerCase().trim()));
            setData(filteredUsers);
        }
    }, [filter, isLoading,users]);

    return (
        <>
            <div className="usersList">
                <ComponentLoader isLoading={isLoading}>
                    <List>
                        {
                            data ? data.map((item: any, index: number) => {
                                return (
                                    <React.Fragment key={item._id}>
                                        <ListItem onClick={()=>dispatch({type:CHAT_ACTIONS.SET_USER,payload:item})}>
                                            <ListItemAvatar>
                                                <Avatar className="avatar">
                                                    {item.name[0]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name} secondary={item.role}/>
                                        </ListItem>
                                        <Divider component="li"/>
                                    </React.Fragment>
                                );
                            }) : null
                        }
                    </List>
                </ComponentLoader>
            </div>
        </>
    );
};

export default ChatList;