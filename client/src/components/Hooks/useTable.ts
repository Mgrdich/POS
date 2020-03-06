import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

function normalizeTableData(data:Array<any>) {
    const headerData:Array<string> = Object.keys(data[0]); //since headers should stay the same
    return {headerData};
}

export function useTable(obj: string | Array<any>) {
    const [data, setData] = useState<Array<any>>();
    const [header, setHeader] = useState<Array<any>>();
    const [body, setBody] = useState<Array<any>>();


    useEffect(function () {
        if (typeof obj === 'string') { //Url case
            axios.get(obj)
                .then(function (res: AxiosResponse) {
                    setData(res.data); //for sync reasons
                    const {headerData:headers} = normalizeTableData(res.data);
                    setHeader(headers);
                }).catch(function (err) {
                console.error(err);
            });
        }
    }, []);


    return {tbody: body, header: header};
} 