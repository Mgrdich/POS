import React from 'react';
import Loader from "../../components/Reusable/Loader";
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {useFetch} from "../../components/Hooks/useFetch";
import {dateFormat} from "../../util/functions";

const AccountDetails:React.FC = () => {

    const {isLoading, data} = useFetch('/users/current');

    return (
        <>
            {isLoading ? (<Loader/>) :
                (
                    <Card  variant="outlined" style={{width:'30%'}}>
                        <CardContent>
                            <Typography  color="primary" component='h1' gutterBottom>
                                Details
                            </Typography>
                            <Typography>
                                 Name: {data.name}
                            </Typography>
                            <Typography >
                                Email: {data.email}
                                <br />
                                Role: {data.role}
                            </Typography>
                            <Typography  variant="caption" component="p">
                                Created at: {dateFormat(data.date)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color='primary'>Edit</Button>
                        </CardActions>
                    </Card>

                )
            }
        </>
    );
};

export default AccountDetails;