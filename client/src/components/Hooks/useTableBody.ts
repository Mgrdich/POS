import {useEffect, useState} from "react";

export function useTableBody(isLoading: boolean, tbody: any,) {
    const [rows, setRows] = useState<any>([]);
    useEffect(() => {
        if (!isLoading && tbody?.length) {

            setRows([...tbody]);
        }
    }, [isLoading, tbody]);

    return [rows, setRows];
}