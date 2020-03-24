import React from 'react';
import ChatList from "./ChatList";
import ConversationBody from "./ConversationBody";
import Grid from "@material-ui/core/Grid";
import {Box, Button, Paper, TextField} from "@material-ui/core";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";

const Chat: React.FC = () => {
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
                                    label="Search Contacts"
                                    id="outlined-size-small"
                                    defaultValue="Small"
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                            <ChatList/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Chat;