import React from 'react';
import {CircularProgress} from "@material-ui/core";
import {ILoader} from "../../interfaces/Reusable";


const Loader: React.FC<ILoader> = (props) => {
    const {className, ...rest} = props;

    return (
        <div className={`Loader ${className ? className : ''}`}>
            <CircularProgress {...rest}/>
        </div>
    );
};

export default Loader;