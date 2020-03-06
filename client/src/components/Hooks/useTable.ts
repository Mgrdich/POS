import {useEffect, useState} from "react";
import {useFetch} from "./useFetch";

function normalizeTableData(data:Array<any>) {
    const headerData:Array<string> = Object.keys(data[0]); //since headers should stay the same
    return {headerData};
}

export function useTable(url: string) {
    const [header, setHeader] = useState<Array<any>>();
    const [body, setBody] = useState<Array<any>>();
    const {isLoading,isError,data} = useFetch(url);

    useEffect(function () {
        if(data.length) {
            const {headerData} = normalizeTableData(data);
            setHeader(headerData);
        }
    },[data]);

    return {tbody: body, header: header,isLoading,isError};
} 