import React, {useState} from 'react';

export  function useTab (initialValue = 0){
    const [value, setValue] = useState<any>(initialValue); //Same type as Material
    const handleChange = function(event: React.ChangeEvent<{}>,value:any):void  {
        setValue(value);
    };

    return [value,handleChange];
}