import {ReactNode} from "react";

export interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}
export interface IChatProvider {
    children:ReactNode;
}

export interface IChatList {
    filter: string;
    data: Array<any>;
    isLoading: boolean;
}
export interface IEditGroup {
    editCallBack: {
        handleClickOpen: Function;
        handleClickOpenGroupInfo: Function;
        handleClickOpenGroupDelete:Function;
    };

}
export interface IMessage {
    position: 'left' | 'right';
    name: string;
    message: string;
}