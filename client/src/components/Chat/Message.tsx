import React from 'react';

interface IMessage {
    position: 'left' | 'right';
    name: string;
    message: string;
}

const Message: React.FC<IMessage> = (props) => {
    return (
        <div className={`message ${props.position}`}>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{props.name}</div>
                    <div className="msg-info-time">12:46</div>
                </div>

                <div className="msg-text">{props.message}</div>
            </div>
        </div>
    );
};

export default Message;