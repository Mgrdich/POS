import React from 'react';
import {Box, Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {ICardMessage} from "../../interfaces/Reusable";


const CardMessage : React.FC<ICardMessage>= (props) => {

    const {header, message, translation, location, button} = props;
    const history = useHistory();

    return (
        <Card>
            <CardContent>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    minHeight={360}
                    color={'common.white'}
                    textAlign={'center'}
                >
                <Typography variant='h4'  align='center' color="primary" gutterBottom>
                    {header}
                </Typography>
                <Typography variant="subtitle1" component="h2" color="primary" align='center'>
                    {message}
                </Typography>

               {button ? <CardActions>
                    <Button  variant="outlined" color='primary' onClick={() => history.push(`${location}`)}>{translation}</Button>
                </CardActions> : null}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardMessage;