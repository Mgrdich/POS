import React, {ChangeEvent, useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import {CHAT_ACTIONS} from "./ActionsConfig";
import io from "socket.io-client";

const socket = io();

const ConversationFooter:React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const [value,setValue] = useState<string>('');

    const sendMessage = function () {
        dispatch({type:CHAT_ACTIONS.SET_MESSAGE,payload:value});
        socket.emit('new message',{message:value});
        setValue('');
    };

    return (
        <div className="conversationFooter">
                <Grid container direction="row" wrap="nowrap">
                    <TextField
                        label="Search Contacts"
                        id="outlined-size-small"
                        variant="filled"
                        size="medium"
                        value={value}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>setValue(e.currentTarget.value)}
                    />
                    <Box px='2'>
                        <Button
                            color="primary"
                            variant="contained"
                            className="FloatRight"
                            onClick={()=>sendMessage()}
                        >Submit</Button>
                    </Box>
                </Grid>
        </div>
    );
};

export default ConversationFooter;