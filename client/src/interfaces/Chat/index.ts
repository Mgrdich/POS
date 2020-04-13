import {ReactNode} from "react";

export interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}
export interface IChatProvider {
    children:ReactNode;
}