import React from 'react';
import {IConditional} from "../../interfaces/Reusable";


const Conditional: React.FC<IConditional> = (props) => {
    const {children, condition} = props;
    return (
        <>
            {condition ? children : null}
        </>
    );
};

export default Conditional;