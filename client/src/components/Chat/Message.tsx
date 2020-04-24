import React from 'react';
import {IMessage} from "../../interfaces/Chat";



const Message: React.FC<IMessage> = (props) => {
    const {position, name, message} = props;
    return (
        <div className={`message ${position}`}>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{name}</div>
                    <div className="msg-info-time">12:46</div>
                </div>

                <div className="msg-text">{message}</div>
            </div>
        </div>
    );
};

export default Message;