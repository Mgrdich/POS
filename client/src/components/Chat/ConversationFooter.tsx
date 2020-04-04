import React, {ChangeEvent, useCallback, useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import {socket} from "../../App";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const ConversationFooter: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const [value, setValue] = useState<string>('');

    const sendMessage = useCallback(function () {
        if (value === '') {
            return
        }
        if (state.user) {
            socket.emit('new message', {text: value, to: state.user._id});
        } else {
            socket.emit('new message group', state.group._id, value);
        }
        setValue('');

    },[state.user,state.group._id,value]);

    const handleSendMessageOnEnter = useCallback(function (e:any) { //TODO check typescript event
        if (e.keyCode === 13) {

            if (value === '') {
                return
            }
            if (state.user) {
                socket.emit('new message', {text: value, to: state.user._id});
            } else {
                socket.emit('new message group', state.group._id, value);
            }
            setValue('');
        }
    },[value,state.user,state.group._id]);


    return (
        <div className="conversationFooter">
            <Grid container direction="row" wrap="nowrap" justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <TextField
                        label="Your Message"
                        id="outlined-size-small"
                        variant="filled"
                        size="medium"
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                        onKeyUp={(e) => handleSendMessageOnEnter(e)}
                    />
                </Grid>
                <Grid  item xs={1}>
                    <IconButton onClick={() => sendMessage()}>
                        <SendIcon
                            fontSize='large'
                            color="primary"
                            className="FloatRight"
                        >Submit</SendIcon>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
};

export default ConversationFooter;