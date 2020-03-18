import {useEffect, useReducer, useState} from "react";
import axios,{AxiosResponse} from "axios";
import {IUseFetch} from "../../interfaces/Hooks";

const dataFetchReducer = function (state: any, action: any) {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: true,
                isError: true,
            };
        default:
            throw new Error();
    }
};

export function useFetch(url: string, refetch:boolean = false):IUseFetch {
    //TODO check the type
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: true,
        isError: false,
        data: [],
    });

    useEffect(function () {
        let didCancel = false;
        const fetchData = function () {
            dispatch({type: 'FETCH_INIT'});
            axios.get(url)
                .then(function (res: AxiosResponse) {
                if (!didCancel) {
                    dispatch({type: 'FETCH_SUCCESS', payload: res.data});
                }
            }).catch(function () {
                if (!didCancel) {
                    dispatch({type: 'FETCH_FAILURE'});
                }
            });
        };
        fetchData();
        return function () {
            didCancel = true;
        };
    }, [dispatch,url,refetch]);

    return state;
}