import {useEffect, useState} from "react";
import {useFetch} from "./useFetch";


//TODO rendering one time
export function useTable(url: string) {
    const [refetch,setRefetch] = useState<boolean>(false);
    const {isError, data , isLoading} = useFetch(url, refetch);
    const [thead, setThead] = useState<Array<any>>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tbody, setBody] = useState<Array<any>>();
    const [keys, setKeys] = useState<Array<any>>();

    useEffect(function () {
        if (Object.keys(data).length && !isLoading) {
            setThead(data.thead);
            setBody(data.tbody);
            setKeys(data.keys);
            setLoading(false);
        }
    },[data,isLoading]);

    return {tbody, thead, keys,isError,isLoading:loading, setRefetch};
} 