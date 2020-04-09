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
        data:{
            [id: string]: { //product id
                _id:string,
                quantity:number
            }
        } | null,
        isLoading:boolean
    }; //TODO type array typed
    nonSubmittedOrders: {
        [id: string]: { //product id
            _id:string,
            quantity:number
        }
    } | null;
    productsGroups: {
        data: {
            [key: string]: {
                _id: string;
                products: {
                    _id:string,
                    name:string,
                    price:number
                } | null;
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
        data:{
            [key: string]: {
                _id: string,
                name: string,
                price: number
            }
        },
        filterArray:Array<any>;
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