import React from 'react';
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {useFetch} from "../Hooks/useFetch";
import ComponentLoader from "../Reusable/ComponentLoader";

const arr = [
    {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    }, {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    }, {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    }, {
        name: 'boghos',
        status: 'working'
    }, {
        name: 'boghos',
        status: 'working'
    },
    {
        name: 'boghos',
        status: 'working'
    }
];

const ChatList: React.FC = () => {
    const {data, isLoading} = useFetch('/users');
    console.log(data, isLoading);
    return (
        <>
            <div className="usersList">
                <ComponentLoader isLoading={isLoading}>
                    <List>
                        {
                            data.tbody ? data.tbody.map((item: any, index: number) => {
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