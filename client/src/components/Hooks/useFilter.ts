import {useCallback, useEffect, useState} from "react";

export function useFilter(initialArrayOrObj:Array<any>|any):any {
    let [initArray,setArray] = useState<Array<any>>([]);
    const [filteredArray,setFilterArray] = useState<Array<any>>(initArray);

    useEffect(function () {
        let initial = Object.keys(initialArrayOrObj).map((item:any)=>initialArrayOrObj[item]);
        setArray(initial);
        setFilterArray(initial);
    },[initialArrayOrObj]);

    const filter = useCallback(function (match:string) {
        const filteredUsers: Array<any> = initArray.filter((item:any)=>item.name.toLowerCase().includes(match.toLowerCase().trim()));
        setFilterArray(filteredUsers);
    },[initArray]);

    return {filteredArray,filter};
}