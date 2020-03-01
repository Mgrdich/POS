import React from 'react';
import {InputField} from "../../interfaces/General";
import {IDynamicFields} from "../../interfaces/Reusable";
import DynamicField from "./DynamicField";


const DynamicFields: React.FC<IDynamicFields> = (props) => {
    const {errors, register, serverError, control} = props;
    return (
        <>
            {
                props.InputFields.map((item: InputField, index: number) => (
                    <DynamicField
                        key={index}
                        item={item}
                        index={index}
                        errors={errors}
                        register={register}
                        serverError={serverError}
                        control={control}
                    />
                ))
            }
        </>
    );
};

export default DynamicFields;