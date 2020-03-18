export type ChangePasswordFormData = {
    current_password : string;
    new_password: string;
    confirm_new_password: string;
}


export interface IAccountDetails {
    isLoading:boolean;
    data:Array<any> | any;
    setRefetch:Function;
}



export type EditAcountDetails = {
    email:string;
    name:string;
}