import {useCallback, useState} from "react";
import {Color} from "@material-ui/lab";

export function useAlert(Message: string = '',alertOpen:boolean = false,type:Color='info'):any {

    const [alertMessage, setAlertMessage] = useState<string>(Message);
    const [openAlert, setOpenAlert] = useState<boolean>(alertOpen);
    const [alertType, setAlertType] = useState<Color>(type);

    const setAlert = useCallback(function (alertMessage:string,openAlert:boolean,alertType:Color){
        setAlertMessage(alertMessage);
        setOpenAlert(openAlert);
        setAlertType(alertType);
    },[]);

    return {alertMessage, openAlert,  alertType, setOpenAlert, setAlert};
}