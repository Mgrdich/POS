import React from 'react';
import {Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";

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
    return (
        <>
            <div className="usersList">
                <List>
                    {
                        arr.map((item, index) => {
                            return (
                                <>
                                    <ListItem key={item.name}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {item.name[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={item.name} secondary={item.status}/>
                                    </ListItem>
                                    <Divider component="li"/>
                                </>
                            );
                        })
                    }
                </List>
            </div>
        </>
    );
};

export default ChatList;