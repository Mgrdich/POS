import {useCallback, useState} from "react";

export function useServerErrorHandle():Array<any>{
    let [errors, setError] = useState<any>({});

    const errorSetter = useCallback<any>(function (error: any) {
        setError({...error});
    },[]);

    const resetServerError = useCallback<any>(function () {
        setError({});
    },[]);

    return [errors, errorSetter,resetServerError];
}