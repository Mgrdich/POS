import React, {useContext, useEffect, useState} from 'react';
import {ChatContext} from "./ChatProvider";
import ComponentLoader from "../Reusable/ComponentLoader";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {CHAT_ACTIONS} from "./ActionsConfig";

interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}

const GroupList:React.FC<IChatList> = (props) => {
    const {filter, data: users, isLoading} = props;
    const [data, setData] = useState<Array<any>>();
    const [state,dispatch] = useContext(ChatContext);

    useEffect(function () {
        if (!isLoading) {
            setData(users);
        }
    }, [isLoading]);

    useEffect(function () {
        if (!isLoading) {
            if (filter === '') {
                return setData(users);
            }
            const filteredUsers:Array<any> = users.filter((item: any) => item.name.includes(filter)); //more nice filter
            setData(filteredUsers);
        }
    }, [filter, isLoading]);

    return (
        <div className="usersList">
            <ComponentLoader isLoading={isLoading}>
                <List>
                    {
                        data ? data.map((item: any, index: number) => {
                            return (
                                <React.Fragment key={item._id}>
                                    <ListItem onClick={()=>dispatch({type:CHAT_ACTIONS.SET_GROUP,payload:item})}>
                                        <ListItemAvatar>
                                            <Avatar className="avatar">
                                                {item.name[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.name}/>
                                    </ListItem>
                                    <Divider component="li"/>
                                </React.Fragment>
                            );
                        }) : null
                    }
                </List>
            </ComponentLoader>
        </div>
    );
};

export default GroupList;