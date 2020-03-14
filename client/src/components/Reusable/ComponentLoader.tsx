import React, {ReactNode} from 'react';
import Loader from "./Loader";

interface IComponentLoader {
    isLoading: boolean;
    children?: ReactNode;
}


const ComponentLoader: React.FC<IComponentLoader> = (props) => {
    const {isLoading, children} = props;
    if (isLoading) {
        return (
            <Loader/>
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