import React from 'react';
import {Avatar} from "@material-ui/core";

interface IMessage {
    position:'left'|'right';
    // message:string;
    avatar:string;
}

const Message:React.FC<IMessage> = (props) => {
    return (
        <div className={`message ${props.position}`}>
            <Avatar sizes="small">
                {props.avatar}
            </Avatar>
            <p className="text">
                hello this is a random test
            </p>
        </div>
    );
};

export default Message;