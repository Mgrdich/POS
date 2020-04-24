import React from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import CardMessage from "../../components/Reusable/CardMessage";
import {useTable} from "../../components/Hooks/useTable";
import {useTableBody} from "../../components/Hooks/useTableBody";

const actionsTypes = ['Open', 'Reserved'];

const ReservedTables = () => {
    const {tbody: tbodyOpen, thead: theadOpen, keys: keysOpen , isLoading: isLoadingOpen,setRefetch: setRefetchOpen} = useTable('/tables/status?type=open');
    const {tbody, thead, keys, isLoading,setRefetch} = useTable('/tables/status?type=reserved');
    const [rowsOpen] = useTableBody(isLoadingOpen, tbodyOpen);
    const [rows] = useTableBody(isLoading, tbody);

    const handleActions = function (type: string, obj: any) {
        if (type === 'open') {

        }
        if (type === 'reserved') {

        }
    };

    return (
        <>
            <ComponentLoader isLoading={isLoadingOpen}>
                {rowsOpen.length && !isLoadingOpen
                    ?
                    (<MyTable
                        thead={theadOpen}
                        tbody={rowsOpen}
                        keys={keysOpen}
                        pagination={true}
                        paginationRowsCount={[3, 5, 10]}
                        actionsTypes={actionsTypes}
                        handleActions={handleActions}
                    />)
                    : (<CardMessage
                        header='No Tables created!'
                    />)}
            </ComponentLoader>

            <ComponentLoader isLoading={isLoading}>
                {rows.length && !isLoading
                    ?
                    (<MyTable
                        thead={thead}
                        tbody={rows}
                        keys={keys}
                        pagination={true}
                        paginationRowsCount={[3, 5, 10]}
                        actionsTypes={actionsTypes}
                        handleActions={handleActions}
                    />)
                    : (<CardMessage
                        header='No Tables created!'
                    />)}
                    </ComponentLoader>

        </>
    );
};

export default ReservedTables;