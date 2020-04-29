import {useEffect, useState} from "react";
import {useFetch} from "./useFetch";
import {isEmpty} from "../../util/functions";


//TODO rendering one time
export function useTable(url: string) {
    const [refetch,setRefetch] = useState<boolean>(false);
    const {isError, data , isLoading} = useFetch(url, refetch);
    const [thead, setThead] = useState<Array<any>>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tbody, setBody] = useState<Array<any>>();
    const [keys, setKeys] = useState<Array<any>>();

    useEffect(function () {
        if (!isLoading) {
            if(!isEmpty(data)) {
                setThead(data.thead);
                setBody(data.tbody);
                setKeys(data.keys);
            }else {
                setThead([]);
                setBody([]);
                setKeys([]);
            }
            setLoading(false);
        }
    },[data,isLoading]);

    return {tbody, thead, keys,isError,isLoading:loading, setRefetch};
} 