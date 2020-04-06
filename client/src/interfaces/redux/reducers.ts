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
    orders: Array<any>; //TODO type array typed
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
    waiter: { //chosen waiter
        _id:string,
        name:string
    };
    createdBy: {
        _id:string,
        name:string
    };
    orderId: string | null;
    tableHashed:{ //tableId -> orderId

    };
    Orders:{ //hashed with id everything about every table

    }
    isLoading: boolean; //info Group
    error:boolean;
}

/**
* Orders Reducer
*
* */