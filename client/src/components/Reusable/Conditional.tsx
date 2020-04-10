import React from 'react';

interface IConditional {
    children: React.ReactNode;
    condition: boolean | undefined;
}


const Conditional: React.FC<IConditional> = (props) => {
    const {children, condition} = props;
    return (
        <div>
            {condition ? children : null}
        </div>
    );
};

export default Conditional;