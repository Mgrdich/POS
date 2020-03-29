import React, {ChangeEvent, useState} from 'react';
import ChatList from "./ChatList";
import Grid from "@material-ui/core/Grid";
import {Box, Paper, TextField} from "@material-ui/core";
import {useFetch} from "../Hooks/useFetch";
import Conversation from "./Conversation";
import ChatProvider from "./ChatProvider";

const ChatComp: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const {data: users, isLoading} = useFetch('/users/chat');

    return (
        <>
            <div className="chatContainer">
                <Grid container direction="row" spacing={1} style={{height: '100'}}>
                    <Grid item md={10} sm={8}>
                        <Paper className="chatGrid">
                            <ChatProvider>
                                <Conversation/>
                            </ChatProvider>
                        </Paper>
                    </Grid>
                    <Grid item md={2} sm={4}>
                        <Paper className="chatGrid listItems">
                            <Box pt={3} px={1}>
                                <TextField
                                    label="Search Users"
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
                                />
                            </Box>
                            <ChatList filter={filter} data={users} isLoading={isLoading}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default ChatComp;