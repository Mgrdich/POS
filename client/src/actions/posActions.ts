import {Action, ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";
import {IState} from "../reducers";
import {hashingArray} from "../util/functions";

type actionVoid = ActionCreator<ThunkAction<void, any, any, AnyAction>>;
type action = ActionCreator<Action>;

export const submitTableOrders: actionVoid = (orderId:string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos, auth} = getState();

    let data: any = {
        waiter: pos.waiter._id || auth.user.id,
        orders: []
    };

    let groupActions = pos.groupActions[orderId];
    let orders = pos.nonSubmittedOrders[orderId];

    data.orders = Object.keys(orders).reduce(function (acc: Array<any>, id: string) {
        let obj: any = {};
        if (groupActions[id]) {
            let productGroupId:string = orders[id].productsGroupId;
            let product: { _id: string, name: string, price: number } = pos.productsGroups.data[productGroupId].products[id];
            obj.product = id;
            obj.quantity = orders[id].quantity;
            obj.productsGroupId = productGroupId;
            obj.name = product.name;
            obj.price = product.price;
            acc.push(obj);
        }
        return acc;
    }, []);

    //TODO check for quantity and stuff then move it to ORDERS

    try {
        const res: AxiosResponse = await axios.put(`/orders/${orderId}`, data);
        if (res.data.alert === 'success') {
            dispatch(
                {
                    type: POS_TYPES.SUBMIT_TABLE_ORDER,
                    payload: {
                        data: hashingArray(data.orders, "product", "_id"),
                        orderId: orderId
                    }
                });
        }
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR}); //TODO order submit Error or Alert
    }
};

export const fetchTableOrders: actionVoid = (orderId: string) => async (dispatch: Dispatch) => {
    try {
        const res:AxiosResponse = await axios.get(`/orders/${orderId}`);
        dispatch({type: POS_TYPES.FETCH_TABLE_ORDER, payload: {data: res.data.orders, orderId}});
    } catch (e) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const setQuantityOrderProduct: action = (orderId:string,productId:string,newQuantity:number) => {
    return {
        type:POS_TYPES.SET_ORDER_QUANTITY,
        payload:{orderId,productId,quantity:newQuantity}
    }
};

export const setOrderId: actionVoid = (tableId) => (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    let payload: string | null = (tableId) ? pos.tableHashed[tableId] : null;
    dispatch({type: POS_TYPES.SET_ORDER_INFO, payload});
};

export const fetchOrders: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.get('/orders');
        let tableHashed: any = {};
        let Orders: any = {};
        for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i];
            tableHashed[item.table] = item._id;
            Orders[item._id] = {}
        }
        dispatch({type: POS_TYPES.FETCH_ORDERS_INFO, payload: {tableHashed, Orders}});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const openOrder: actionVoid = (tableId: string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos, auth} = getState();
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.put('/orders', {
            waiter: pos.waiter._id && auth.user.id, //TODO always make the waiter chosen
            table: tableId
        });
        dispatch({type: POS_TYPES.CREATE_ORDER_INFO, payload: {data: res.data, tableId}});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const setUnSubmittedOrder: action = (productId, productGroupId, orderId) => {
    return {
        type: POS_TYPES.SET_UN_SUBMITTED_ORDERS,
        payload: {productId, productGroupId, orderId: orderId}
    };
};

export const setGroupAction :action = (orderId:string,productId:string,check:boolean) => {
    return {
        type:POS_TYPES.SET_GROUP_ACTIONS,
        payload:{orderId,productId,check}
    }
};

export const setAllGroupActions:actionVoid = (orderId:string,check:boolean) =>(dispatch: Dispatch, getState: () => IState) => {
    let {pos} = getState();
    let payload:any = {orderId:orderId,data:{}};
    if(check && pos.nonSubmittedOrders && pos.nonSubmittedOrders[orderId]){
        payload.data = Object.keys(pos.nonSubmittedOrders[orderId]).reduce(function (acc: any, curr: string) {
            let obj: any = {...acc};
            obj[curr] = true;
            return obj
        }, {});
    }
    dispatch({
        type:POS_TYPES.SET_ALL_GROUP_ACTIONS,
        payload:payload
    });
};

export const setWaiter: action = (user: { _id: string, name: string }) => {
    return {
        type: POS_TYPES.SET_WAITER,
        payload: user
    };
};

export const fetchTables: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_TABLES});
        const res: AxiosResponse = await axios.get('/orders/tables');
        dispatch({type: POS_TYPES.FETCH_TABLES, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const fetchProductsGroups: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_PRODUCTS_GROUPS});
        const res: AxiosResponse = await axios.get('/orders/products-groups');
        dispatch({type: POS_TYPES.FETCH_PRODUCTS_GROUPS, payload: hashingArray(res.data, "_id")});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const fetchSelectProducts = (id: string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    const productsGroups: any = pos.productsGroups;
    if (productsGroups.data[id].products) {
        return dispatch({
            type: POS_TYPES.SET_PRODUCTS, payload: {
                data: productsGroups.data[id].products,
                productGroupId: id
            }
        });
    }
    try {
        dispatch({type: POS_TYPES.SET_LOADING_PRODUCTS});
        const products = await axios.get(`/orders/products/${id}`);
        dispatch({
            type: POS_TYPES.FETCH_PRODUCTS, payload: {
                data: hashingArray(products.data.products, "_id"),
                productGroupId: id
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};