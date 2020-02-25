export interface IError {
    value: string | number;
    msg: string;
    param: string;
    location: string;
    nestedErrors?:Array<any>;
}

export interface ImyError extends Error {
    statusCode: number;
    message: string;
    data: any;
}