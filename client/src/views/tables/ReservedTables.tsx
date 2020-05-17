import React, {useCallback} from 'react';
import {useTable} from "../../components/Hooks/useTable";
import {useTableBody} from "../../components/Hooks/useTableBody";
import {TableActionOptions} from "../../constants/Enums/General";
import axios from "axios";
import Table from "../../components/Reusable/Table/Table";

const actionsTypes: Array<TableActionOptions> = [TableActionOptions.reserved];

const actionsTypesReserved: Array<TableActionOptions> = [TableActionOptions.closed];

const ReservedTables = () => {
    const {tbody: tbodyOpen, thead: theadOpen, keys: keysOpen, isLoading: isLoadingOpen, setRefetch: setRefetchOpen} = useTable('/tables/status?type=open&type=closed');
    const {tbody, thead, keys, isLoading, setRefetch: setRefetchReserved} = useTable('/tables/status?type=reserved');
    const [rowsOpen] = useTableBody(isLoadingOpen, tbodyOpen);
    const [rows] = useTableBody(isLoading, tbody);

    const handleActions = useCallback(function (type: TableActionOptions, obj: any) {
        axios.patch(`/tables/status/${obj._id}`).then(function () {
            setRefetchReserved(prevState => !prevState);
            setRefetchOpen(prevState => !prevState);
        })
    }, [setRefetchOpen, setRefetchReserved]);

    return (
        <>
            <Table
                thead={theadOpen}
                tbody={rowsOpen}
                keys={keysOpen}
                pagination={true}
                paginationRowsCount={[3, 5, 10]}
                actionsTypes={actionsTypes}
                handleActions={handleActions}
                isLoading={isLoading}
            />

            <Table
                thead={thead}
                tbody={rows}
                keys={keys}
                pagination={true}
                paginationRowsCount={[3, 5, 10]}
                actionsTypes={actionsTypesReserved}
                handleActions={handleActions}
                isLoading={isLoading}
            />
        </>
    );
};

export default ReservedTables;