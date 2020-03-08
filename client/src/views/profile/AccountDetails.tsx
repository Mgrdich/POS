import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from "../../components/Reusable/Loader";
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';

const AccountDetails:React.FC = () => {
    const [detail, setDetail]= useState<any>({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get('/users/current').then(function(res){
            const data = res.data;
            setDetail({...detail,...data});
             setLoading(false);
        }).catch(function(e){
            console.log(e);
        })
    },[]);

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