import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import Loader from "../../components/Reusable/Loader";
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';

const AccountDetails:React.FC = () => {
    const [detail, setDetail]= useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(function () { //TODO useFetch hook use
        axios.get('/users/current')
            .then(function (res: AxiosResponse) {
                setDetail({...res.data});
                setLoading(false);
            }).catch(function (e) {
            console.log(e);
        })
    }, []);

    //TODO write a date format function in Util
    return (
        <>
            {loading ? (<Loader/>) :
                (
                    <Card  variant="outlined" style={{width:'30%'}}>
                        <CardContent>
                            <Typography  color="primary" component='h1' gutterBottom>
                                Details
                            </Typography>
                            <Typography>
                                 Name: {detail.name}
                            </Typography>
                            <Typography >
                                Email: {detail.email}
                                <br />
                                Role: {detail.role}
                            </Typography>
                            <Typography  variant="caption" component="p">
                                Created at: {new Date(detail.date).toLocaleString()}

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