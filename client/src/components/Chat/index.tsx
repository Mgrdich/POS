import React from 'react';
import ChatList from "./ChatList";
import Conversation from "./Conversation";
import Grid from "@material-ui/core/Grid";
import {Box, Paper, TextField} from "@material-ui/core";

const Chat: React.FC = () => {
    return (
        <>
            <div className="chatContainer">
                <Grid container direction="row" spacing={1} style={{height: '100'}}>
                    <Grid item lg={10}>
                        <Paper className="chatGrid">
                            <div className="chatInterface">
                                <Conversation/>
                                <Box px={2} pt={2}>
                                    <TextField
                                        label="Search Contacts"
                                        id="outlined-size-small"
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={2}>
                        <Paper className="chatGrid">
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