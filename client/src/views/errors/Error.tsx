import React from 'react';
import {IError} from "../../interfaces/Views/Errors";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const Error: React.FC<IError> = (props) => {
    const history = useHistory();

    //TODO bod ->Body
    return (
        <div className='error'>
            <div className='head'>
                <h1>Error {props.errorNumber}</h1>
                <div className={`errorPage errorPage${props.errorNumber}`}>
                    <div className='icon-wrapper'>
                    <p>{props.errorText}</p>
                    <SentimentVeryDissatisfiedIcon/>
                    </div>
                </div>
            </div>

            <div className='bod'>
                <Button color="primary" variant="outlined" onClick={()=> history.push('/')}>Home Page</Button>
            </div>

        </div>
    );
};

export default Error;