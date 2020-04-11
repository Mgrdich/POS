import React from 'react';

interface IConditional {
    children: React.ReactNode;
    condition: boolean;
}


const Conditional: React.FC<IConditional> = (props) => {
    const {children, condition} = props;
    return (
        <>
            {condition ? children : null}
        </>
    );
};

export default Conditional;