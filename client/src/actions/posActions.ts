import {ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";
import {POS_TYPES} from "./types";
import {IState} from "../reducers";

type actionVoid = ActionCreator<ThunkAction<void, any, any, AnyAction>>;

export const openOrder: actionVoid = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POS_TYPES.SET_LOADING_INFO});
        const res: AxiosResponse = await axios.put('/orders');
        dispatch({type: POS_TYPES.SET_ORDER_INFO, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR})
    }
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
        dispatch({type: POS_TYPES.FETCH_PRODUCTS_GROUPS, payload: res.data});
    } catch (err) {
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const fetchSelectProducts = (id: string) => async (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    const productsGroups: any = pos.productsGroups;
    if (productsGroups.data[id].products && productsGroups.data[id].products.length) {
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
                data: products.data.products,
                productGroupId: id
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({type: POS_TYPES.SET_ERROR});
    }
};

export const filterProducts = (text: string) => (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    let products:Array<any> | null = [];
    if(pos.productsGroup) {
        products = pos.productsGroups.data[pos.productsGroup].products;
    }
    if(!products || !products.length) {
        return;
    }
    const filteredProducts = products.filter(function(item){ //TODO with more data converting it into major Filter
        return item.name.toLowerCase().includes(text.toLowerCase().trim())
    });
    dispatch({type:POS_TYPES.FILTER_PRODUCTS,payload:filteredProducts})
};

export const filterProductsGroup = (text: string) => (dispatch: Dispatch, getState: () => IState) => {
    const {pos} = getState();
    //TODO more algorithmically good solution
    const productsGroups:Array<any> = Object.keys(pos.productsGroups.data);
    const filteredProducts = productsGroups.reduce(function(acc,key:string){ //TODO with more data converting it into major Filter
        let arr:Array<any> = [...acc];
        if(pos.productsGroups.data[key].name.toLowerCase().includes(text.toLowerCase().trim())) {
         arr.push({
             name:pos.productsGroups.data[key].name,
             _id:key
         });
        }
        return arr;
    },[]);
    dispatch({type:POS_TYPES.FILTER_PRODUCTS_GROUP,payload:filteredProducts})
};