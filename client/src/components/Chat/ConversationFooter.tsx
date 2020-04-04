import React, {ChangeEvent, useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import {socket} from "../../App";
import SendIcon from '@material-ui/icons/Send';

const ConversationFooter: React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    const [value, setValue] = useState<string>('');

    const sendMessage = function (): void {
        if (value === '') {
            return
        }
        if (state.user) {
            socket.emit('new message', {text: value, to: state.user._id});
        } else {
            socket.emit('new message group', state.group._id, value);
        }
        setValue('');
    };


    const handleSendMessageOnEnter = (e: any) => {
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
    };

    return (
        <div className="conversationFooter">
            <Grid container direction="row" wrap="nowrap" justify='center'>
                <Grid item sm={3} lg={6}  >
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
                <Grid item sm={3} lg={4} >
                    <SendIcon
                        color="primary"
                        className="FloatRight"
                        onClick={() => sendMessage()}
                    >Submit</SendIcon>
                </Grid>
            </Grid>
        </div>
    );
};

export default ConversationFooter;