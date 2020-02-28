import React from "react";
import {IDynamicFields} from "../../interfaces/Reusable";
import DynamicFields from "../Reusable/DynamicFields";

export function DynamicFieldWrapper<P extends object>(WrappedComponent: React.ComponentType<P>,DynamicFilterProps:IDynamicFields):React.FC<P> {
    return function (props: P) {
        return (
            <WrappedComponent {...props as P}>
                <DynamicFields {...DynamicFilterProps}/>
            </WrappedComponent>
        );
    }
}