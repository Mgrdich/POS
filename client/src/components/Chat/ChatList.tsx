import React, {useEffect, useState} from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ComponentLoader from "../Reusable/ComponentLoader";

interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}

const ChatList: React.FC<IChatList> = (props) => {
    const {filter, data: users, isLoading} = props;
    const [data, setData] = useState<Array<any>>();

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
        <>
            <div className="usersList">
                <ComponentLoader isLoading={isLoading}>
                    <List>
                        {
                            data ? data.map((item: any, index: number) => {
                                return (
                                    <React.Fragment key={item._id}>
                                        <ListItem>
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