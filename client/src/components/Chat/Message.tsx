import React from 'react';

interface IMessage {
    position: 'left' | 'right';
    // message:string;
    name?: string;
}

const Message: React.FC<IMessage> = (props) => {
    return (
        <div className={`message ${props.position}`}>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">Sajad</div>
                    <div className="msg-info-time">12:46</div>
                </div>

                <div className="msg-text">
                    You can change your name in JS section!
                </div>
            </div>
        </div>
    );
};

export default Message;