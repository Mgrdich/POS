import React, {ChangeEvent, useContext, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";
import {ChatContext} from "./ChatProvider";
import {socket} from "../../App";

const ConversationFooter:React.FC = () => {
    const [state, dispatch] = useContext(ChatContext);
    console.log(state)
    const [value,setValue] = useState<string>('');

    const sendMessage = function ():void {
        if(value === ''){
            return
        }
        if(state.user) {
            socket.emit('new message',{text:value,to:state.user._id});
        } else  {
            socket.emit('new message group',state.group._id,value);
        }
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