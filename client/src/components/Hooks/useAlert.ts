import {useState} from "react";

export function useAlert(initialValue: string = ''):Array<any> {

    const [message, setMessage] = useState<string>(initialValue);

     function messageSetter(myMessage: string)  {
       return setMessage(myMessage);
    }

    return [message, messageSetter];
}