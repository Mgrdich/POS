import React, {ChangeEvent, useContext, useState} from 'react';
import ChatList from "./ChatList";
import ConversationBody from "./ConversationBody";
import Grid from "@material-ui/core/Grid";
import {Box, Paper, TextField} from "@material-ui/core";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import {useFetch} from "../Hooks/useFetch";
import {ChatContext} from "./ChatProvider";

const ChatComp: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const {data: users, isLoading} = useFetch('/users');
    const [state, dispatch] = useContext(ChatContext);


    return (
        <>
            <div className="chatContainer">
                <Grid container direction="row" spacing={1} style={{height: '100'}}>
                    <Grid item lg={10}>
                        <Paper className="chatGrid">
                            {state.user ? (<div className="conversation">
                                <ConversationHeader/>
                                <ConversationBody/>
                                <ConversationFooter/>
                            </div>) : null}
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
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

export default ChatComp;