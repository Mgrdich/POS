import React from 'react';
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {IErrorHandler} from "../../interfaces/Views/Errors";

const ErrorHandler: React.FC<IErrorHandler> = (props) => {

    //TODO div error should be with a single refactor component From Error.tsx
    return (
        <>
            {
                !props.error ? props.children : (<div className='error'>
                    <div className='head'>
                        <h1>Error</h1>
                        <div className='errorPage'>
                            <div className='icon-wrapper'>
                                <p>Something Went Wrong Refresh the Page</p>
                                <SentimentVeryDissatisfiedIcon/>
                            </div>
                        </div>
                    </div>
                </div>)

            }
        </>
    );
};

export default ErrorHandler;