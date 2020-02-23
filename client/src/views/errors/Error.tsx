import React from 'react';
import {IError} from "../../interfaces/Views/Errors";



const Error: React.FC<IError> = (props) => {
    return (
        <div className={`errorPage errorPage${props.errorNumber}`}>
            <h1>Error{props.errorNumber}</h1>
            <p>{props.errorText}</p>
        </div>
    );
};

export default Error;