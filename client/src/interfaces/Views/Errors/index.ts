import React from "react";

export interface IError {
    errorNumber: number;
    errorText: string;
}

export interface IErrorHandler {
    error:boolean;
    children:React.ReactNode;
}
