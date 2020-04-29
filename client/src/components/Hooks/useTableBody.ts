import {useEffect, useState} from "react";

export function useTableBody(isLoading: boolean, tbody: any, id:string = '') {
    const [rows, setRows] = useState<any>([]);
    const [deletedId, changeDeletedId] = useState<string>('');
    useEffect(() => {
        if (!isLoading && tbody?.length) { //isEmpty check already done
            setRows([...tbody]);
        }
    }, [isLoading, tbody]);

    return [rows, setRows, deletedId, changeDeletedId];
}