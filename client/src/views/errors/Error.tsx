import React from 'react';

interface IError {
    errorNumber: number;
    errorText: string;
}

const Error: React.FC<IError> = (props) => {
    return (
        <div className={`errorPage errorPage${props.errorNumber}`}>
            <h1>Error{props.errorNumber}</h1>
            <p>{props.errorText}</p>
        </div>
    );
};

export default Error;