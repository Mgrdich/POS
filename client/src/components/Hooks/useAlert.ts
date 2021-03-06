import {useCallback, useState} from "react";
import {Color} from "@material-ui/lab";

export function useAlert(message: string = '', alertOpen: boolean = false, alert: Color = 'info'): any {

    const [alertMessage, setAlertMessage] = useState<string>(message);
    const [openAlert, setOpenAlert] = useState<boolean>(alertOpen);
    const [alertType, setAlertType] = useState<Color>(alert);

    const setAlert = useCallback(function ({message, alert}: { message: string, alert: Color }, alertType: boolean | any) {
        setAlertMessage(message);
        setAlertType(alert);
        if (typeof (alertType) === 'object') {

            setOpenAlert({...alertType});

        } else {

            setOpenAlert(true);
        }
    }, []);

    return {alertMessage, openAlert, alertType, setOpenAlert, setAlert};
}