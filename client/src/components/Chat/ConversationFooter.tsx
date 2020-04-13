import React, {ChangeEvent, useCallback, useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Icon, TextField} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import {socket} from "../../App";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";

const ConversationFooter: React.FC = () => {
    const [state] = useContext(ChatContext);
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

    },[state.user,state.group,value]);

    const handleSendMessageOnEnter = useCallback(function (e:React.KeyboardEvent) {
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
    },[value,state.user,state.group]);


    return (
        <div className="conversationFooter">
            <Grid container direction="row" wrap="nowrap" justify='center' alignItems='center'>
                <Grid className='input-container' item xs={10} container direction='row' alignItems='center'>
                    <TextField
                        label="Your Message"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                        onKeyUp={(e:React.KeyboardEvent<HTMLInputElement>) => handleSendMessageOnEnter(e)}
                    />
                </Grid>
                <Grid  item xs={2} container direction='row' justify='center' alignItems='center'>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        endIcon={<SendIcon/>}
                        onClick={() => sendMessage()}
                    > Send
                    </Button>

                </Grid>
            </Grid>
        </div>
    );
};

export default ConversationFooter;