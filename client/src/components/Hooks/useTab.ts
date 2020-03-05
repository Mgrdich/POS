import {ChangeEvent,useState} from 'react';

export function useTab (initialValue = 0):Array<any>{
    const [value, setValue] = useState<any>(initialValue); //Same type as Material

    const handleChange = function(event: ChangeEvent<{}>,value:any):void  {
        setValue(value);
    };

    return [value,handleChange];
}