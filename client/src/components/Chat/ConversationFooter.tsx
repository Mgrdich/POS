import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";
import Input from "@material-ui/core/Input";

const ConversationFooter = () => {
    return (
        <div className="conversationFooter">
            <Box px={2} pt={2}>
                <Grid container direction="row" wrap="nowrap">
                    <Input inputProps={{ 'aria-label': 'description' }} className="chatInpu"/>
                    <Box px='2'>
                        <Button
                            color="primary"
                            variant="contained"
                            className="FloatRight"
                            type="submit"
                        >Submit</Button>
                    </Box>
                </Grid>
            </Box>
        </div>
    );
};

export default ConversationFooter;