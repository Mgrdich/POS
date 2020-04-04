/*
* Authentication Reducer
* */
export interface IAuthReducer {
    isAuthenticated: boolean;
    user: any; //TODO typed
}

/**
 * POS Reducer
 *
 * */
export interface IPOSReducer {
    orders: Array<any>; //TODO type array typed
    productsGroups: {
        data: {
            [key: string]: {
                _id: string;
                products: Array<any> | null;
                name: string;
                isLoading: boolean; //for products Fetch
            };
        },
        isLoading: boolean; //for Products Group
    };
    productsGroup: string | null; //id
    waiter: any; // id name
    createdBy: any // id name
    orderId: string | null;
    isLoading: boolean; //info Group
}