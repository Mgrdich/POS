import React from 'react';
import MyTableHead from "./MyTableHead";
import MyTableBody from "./MyTableBody";
import {Table, TablePagination} from "@material-ui/core";
import {usePagination} from "../../Hooks/usePagination";
import {IMyTable} from "../../../interfaces/Reusable";


//TODO make the use Pagination hook more reusable

const MyTable: React.FC<IMyTable> = (props) => {

    const {thead, tbody, pagination, paginationRowsCount,keys,actionsTypes,handleActions} = props;
    const {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = usePagination();

    return (
        <>
            <Table>
                <MyTableHead data={thead} keys={keys} actionsTypes={actionsTypes}/>
                <MyTableBody
                    keys={keys}
                    data={tbody}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    actionsTypes={actionsTypes}
                    handleActions={handleActions}
                />
            </Table>
            {pagination && <TablePagination
                rowsPerPageOptions={paginationRowsCount}
                component="div"
                count={tbody.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
        </>
    );
};

export default MyTable;