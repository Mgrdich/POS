import {useEffect, useState} from "react";
import {useFetch} from "./useFetch";

function normalizeTableData(data:Array<any>) {
    const headerData:Array<string> = Object.keys(data[0]); //since headers should stay the same
    return {headerData};
}

//TODO rendering one time
export function useTable(url: string) {
    const {isLoading,isError,data} = useFetch(url);
    const [header, setHeader] = useState<Array<any>>();
    const [body, setBody] = useState<Array<any>>();

    useEffect(function () {
        if(data.length) {
            const {headerData} = normalizeTableData(data);
            setHeader(headerData);
        }
    },[data.length]);

    return {tbody: body, header: header};
} 