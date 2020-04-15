import {useEffect, useRef} from "react";

export function useScrollDown(...dep:any) {
    const listContainer = useRef<any>(null);
       useEffect(function(){
        listContainer.current.scrollBy({top:listContainer.current.scrollHeight, left: 0, behaviour: "smooth"})
    },[dep]);

    return [listContainer];
};
