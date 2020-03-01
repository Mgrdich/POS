import React from 'react';
import {InputField} from "../../interfaces/General";
import {IDynamicFields} from "../../interfaces/Reusable";
import DynamicField from "./DynamicField";

const DynamicFields: React.FC<IDynamicFields> = (props) => {
    const {errors, register, serverError, control,Component,ComponentProps} = props;

    //TODO a lot of code repetition
    if (Component) {
        return (
            <>
                {
                    props.InputFields.map((item: InputField, index: number) => (
                        <Component{...ComponentProps} key={index}>
                            <DynamicField
                                item={item}
                                errors={errors}
                                register={register}
                                serverError={serverError}
                                control={control}
                            />
                        </Component>
                    ))
                }
            </>
        );
    }
    return (
        <>
            {
                props.InputFields.map((item: InputField, index: number) => (
                        <DynamicField
                            key={index}
                            item={item}
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