import React, {ReactNode} from 'react';
import Loader from "./Loader";
import {IComponentLoader} from "../../interfaces/Reusable";


const ComponentLoader: React.FC<IComponentLoader> = (props) => {
    const {isLoading, children} = props;
    if (isLoading) {
        return (
            <Loader className='loader-container'/>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
};

export default ComponentLoader;