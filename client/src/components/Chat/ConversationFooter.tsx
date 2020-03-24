import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Box, Button, TextField} from "@material-ui/core";

const ConversationFooter = () => {
    return (
        <div className="conversationFooter">
                <Grid container direction="row" wrap="nowrap">
                    <TextField
                        label="Search Contacts"
                        id="outlined-size-small"
                        variant="filled"
                        size="medium"
                    />
                    <Box px='2'>
                        <Button
                            color="primary"
                            variant="contained"
                            className="FloatRight"
                            type="submit"
                        >Submit</Button>
                    </Box>
                </Grid>
        </div>
    );
};

export default ConversationFooter;