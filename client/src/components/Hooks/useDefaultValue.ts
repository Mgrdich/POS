import {InputField} from "../../interfaces/General";
import {useEffect, useState} from "react";

export function useDefaultValue(inputFields: Array<InputField>,data:any) {
    const [myInputFields,setInputFields] = useState<Array<InputField>>(inputFields);
    
    useEffect(function () {
        if (data) {
            const newInputFields =  myInputFields.map((item:InputField,index)=>{
                item.default = data[item.name];
                return item;
            });
            setInputFields(newInputFields);
        }
    }, [data, myInputFields]);

    return myInputFields;
}