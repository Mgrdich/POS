import React from 'react';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {IButtonLink} from "../../interfaces/Reusable";


const ButtonLink: React.FC<IButtonLink> = (props) => {
    const {to, children,...ButtonProps} = props;
    return (
        <Link to={props.to}>
            <Button {...ButtonProps}>{children}</Button>
        </Link>
    );
};

export default ButtonLink;