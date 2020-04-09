/*
* Authentication Reducer
*
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
    orders: {
        data:Array<any>,
        isLoading:boolean
    }; //TODO type array typed
    nonSubmittedOrders: Array<any>; //TODO type array typed
    productsGroups: {
        data: {
            [key: string]: {
                _id: string;
                products: Array<any> | null;
                name: string;
            };
        },
        isLoading: boolean; //for Products Group
        filterArray:Array<any>;
    };
    tables:{
        data:Array<any>,
        isLoading:boolean
    };
    productsGroup: string | null; //id
    products:{
        data:any, //TODO to be filled
        isLoading:boolean
    }
    waiter: { //chosen waiter id
        _id:string,
        name:string
    };
    createdBy: {
        _id:string,
        name:string
    };
    // orderId: string | null;
    tableHashed: { //tableId -> orderId
        [key: string]: string;
    };
    Orders:{ //hashed with id everything about every table
        [key: string] :{
            orders:Array<any>;
        }
    }
    isLoading: boolean; //info Group
    error:boolean;
}

/**
* Orders Reducer
*
* */