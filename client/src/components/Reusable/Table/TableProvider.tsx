import React, {createContext, useReducer} from 'react';
import {MyTableReducer} from "./MyTableReducer";

export const MyTableContext = createContext<Array<any>>([])
const MyTableProvider = (props: any) => {
    const {children} = props;
    const [state, dispatch] = useReducer<any>(MyTableReducer, {
        thead: {},
        tbody: [],
        pagination: null,
        paginationRowsCount: [],
        keys: [],
        actionsTypes: [],
        handleActions: null,
        page:0,
        rowsPerPage:5,
        count:0,

    });
    return (
        <MyTableContext.Provider value={[state, dispatch]}>
            {children}
        </MyTableContext.Provider>
    );
};

export default MyTableProvider;