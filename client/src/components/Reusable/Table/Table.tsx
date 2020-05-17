import React from 'react';
import MyTableProvider from "./TableProvider";
import MyTable from "./MyTable";
import ComponentLoader from "../ComponentLoader";
import CardMessage from "../CardMessage";
import {isEmpty} from "../../../util/functions";
import {ITable} from "../../../interfaces/Reusable";




const Table : React.FC<ITable> = (props) => {
    const {thead, tbody, pagination, paginationRowsCount, keys, actionsTypes, handleActions, isLoading} = props;

    return (
        <ComponentLoader isLoading={isLoading}>
            {!isEmpty(tbody) && !isLoading ?
                <MyTableProvider>
                    <MyTable
                        thead={thead}
                        tbody={tbody}
                        keys={keys}
                        pagination={pagination}
                        paginationRowsCount={paginationRowsCount}
                        actionsTypes={actionsTypes}
                        handleActions={handleActions}/>
                </MyTableProvider>
                : <CardMessage
                    header='No products created!'
                />}
        </ComponentLoader>
    );
};

export default Table;