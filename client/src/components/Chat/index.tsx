import React, {ChangeEvent, useState} from 'react';
import ChatList from "./ChatList";
import ConversationBody from "./ConversationBody";
import Grid from "@material-ui/core/Grid";
import {Box, Button, Paper, TextField} from "@material-ui/core";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import {useFetch} from "../Hooks/useFetch";

const Chat: React.FC = () => {
    const [filter,setFilter] = useState<string>('');
    const {data:users, isLoading} = useFetch('/users');

    return (
        <>
            <div className="chatContainer">
                <Grid container direction="row" spacing={1} style={{height: '100'}}>
                    <Grid item lg={10}>
                        <Paper className="chatGrid">
                            <div className="conversation">
                                <ConversationHeader avatar="H"/>
                                <ConversationBody/>
                                <ConversationFooter/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={2}>
                        <Paper className="chatGrid listItems">
                            <Box pt={3} px={1}>
                                <TextField
                                    label="Search Users"
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setFilter(e.target.value)}
                                />
                            </Box>
                            <ChatList filter={filter} data={users.tbody} isLoading={isLoading}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Chat;