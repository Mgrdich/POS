import {useCallback, useState} from "react";
import {useFetch} from "./useFetch";

export function useFetchUrl(url: string) {
    const [fetchURL, setFetchUrl] = useState<string>(url);
    const {data, isLoading} = useFetch(fetchURL);

    const handleChangeUrl = useCallback(function (url:string) {
        setFetchUrl(url);
    },[]);

    return {data,isLoading,handleChangeUrl};
}