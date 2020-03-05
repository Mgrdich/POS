import {useCallback, useState} from "react";

export function useAlert(Message: string = '',alertOpen:boolean = false,type:string=''):any {

    const [alertMessage, setAlertMessage] = useState<string>(Message);
    const [openAlert, setOpenAlert] = useState<boolean>(alertOpen);
    const [alertType, setAlertType] = useState<string>(type);

    const setAlert = useCallback(function (alertMessage:string,openAlert:boolean,alertType:string){
        setAlertMessage(alertMessage);
        setOpenAlert(openAlert);
        setAlertType(alertType);
    },[]);

    return {alertMessage, openAlert,  alertType, setOpenAlert, setAlert};
}