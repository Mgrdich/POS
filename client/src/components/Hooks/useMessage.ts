import {useState} from "react";


export function useMessage(initialValue: string = '') {

    const [message, setMessage] = useState<any>(initialValue);

    const messageSetter = function(myMessage: string) :void  {
        setMessage(myMessage);
    };

    return [message, messageSetter]
};