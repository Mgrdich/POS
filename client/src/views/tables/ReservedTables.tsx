import React, {useCallback} from 'react';
import MyTable from "../../components/Reusable/Table/MyTable";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import CardMessage from "../../components/Reusable/CardMessage";
import {useTable} from "../../components/Hooks/useTable";
import {useTableBody} from "../../components/Hooks/useTableBody";
import {TableActionOptions} from "../../constants/Enums/General";
import axios from "axios";
import {isEmpty} from "../../util/functions";

const actionsTypes:Array<TableActionOptions> = [ TableActionOptions.reserved];

const actionsTypesReserved:Array<TableActionOptions> = [TableActionOptions.closed];

const ReservedTables = () => {
    const {tbody: tbodyOpen, thead: theadOpen, keys: keysOpen , isLoading: isLoadingOpen,setRefetch:setRefetchOpen} = useTable('/tables/status?type=open&type=closed');
    const {tbody, thead, keys, isLoading,setRefetch:setRefetchReserved} = useTable('/tables/status?type=reserved');
    const [rowsOpen] = useTableBody(isLoadingOpen, tbodyOpen);
    const [rows] = useTableBody(isLoading, tbody);

    const handleActions = useCallback(function (type: TableActionOptions, obj: any) {
        axios.patch(`/tables/status/${obj._id}`).then(function () {
           setRefetchReserved(prevState => !prevState);
           setRefetchOpen(prevState => !prevState);
        })
    }, []);

    return (
        <>
            <ComponentLoader isLoading={isLoadingOpen}>
                {!isEmpty(rowsOpen) && !isLoadingOpen
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
                {!isEmpty(rows) && !isLoading
                    ?
                    (<MyTable
                        thead={thead}
                        tbody={rows}
                        keys={keys}
                        pagination={true}
                        paginationRowsCount={[3, 5, 10]}
                        actionsTypes={actionsTypesReserved}
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