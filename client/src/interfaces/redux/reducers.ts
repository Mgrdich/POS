/*
* Authentication Reducer
*
* */
export interface IAuthReducer {
    isAuthenticated: boolean;
    user:any;
}

/**
 * POS Reducer
 *
 * */
export interface IPOSReducer {
    orders: {
        _id: string | null;
        isLoading:boolean
    };
    nonSubmittedOrders: {
        [id:string]: { //orderId
            [id: string]: { //product id
                _id:string,
                quantity:number
                productsGroupId:string;
            }
        }
    };
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
            [id: string]: { //product id
                _id: string,
                quantity: number,
                productGroupId:string
            }
        }
    };
    groupActions:{
        [id:string]: { //orderId
            [productId:string]:boolean; //productId
        }
    };
    isLoading: boolean; //info Group
    error:boolean;
}

/**
* Orders Reducer
*
* */