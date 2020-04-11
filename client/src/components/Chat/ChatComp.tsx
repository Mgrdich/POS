import React, {ChangeEvent, useContext, useState} from 'react';
import ChatList from "./ChatList";
import Grid from "@material-ui/core/Grid";
import {Box, Paper, Tabs, TextField} from "@material-ui/core";
import {useFetch} from "../Hooks/useFetch";
import Conversation from "./Conversation";
import Tab from "@material-ui/core/Tab";
import GroupList from "./GroupList";
import {ChatContext} from "./ChatProvider";

const ChatComp: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const [state, dispatch] = useContext(ChatContext);
    const {data: users, isLoading} = useFetch('/users/chat'); //from outside
    const {data: groupUsers, isLoading: groupLoading} = useFetch('/group-chat', state.fetch);
    const [tab, setTab] = useState<number>(0);

    const handleTabChange = function (event: React.ChangeEvent<{}>, newValue: number) {
        setTab(newValue);
    };

    return (
        <div className="chatContainer">
            <Grid container direction="row" spacing={1} style={{height: '100'}}>
                <Grid item md={9} sm={8}>
                    <Paper className="chatGrid">
                        <Conversation/>
                    </Paper>
                </Grid>
                <Grid item md={3} sm={4}>
                    <Paper className="chatGrid listItems">
                        <Box pt={3} pb={1} px={1}>
                            <TextField
                                className='search-container'
                                label="Search Users"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
                            />
                            <Paper square>
                                <Tabs
                                    value={tab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleTabChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="Chat"/>
                                    <Tab label="Group"/>
                                </Tabs>
                            </Paper>
                        </Box>
                        {
                            (!tab) ?
                                <ChatList filter={filter} data={users} isLoading={isLoading}/> :
                                <GroupList filter={filter} data={groupUsers.empty ? [] : groupUsers}
                                           isLoading={groupLoading}/>
                        }

                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatComp;