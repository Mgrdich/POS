import {useState} from "react";

export function useModule (toggleModule:any = false) {
    const [open, setOpen] = useState<any>(toggleModule);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return [open, handleClickOpen, handleClose];
}