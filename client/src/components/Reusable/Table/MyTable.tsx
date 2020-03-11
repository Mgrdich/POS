import React from 'react';
import MyTableHead from "./MyTableHead";
import MyTableBody from "./MyTableBody";
import {Table, TablePagination} from "@material-ui/core";
import {usePagination} from "../../Hooks/usePagination";
import {IMyTable} from "../../../interfaces/Reusable";




const MyTable: React.FC<IMyTable> = (props) => {

    const {headCellData, thead, data, pagination, paginationRowsCount} = props;
    const {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = usePagination();


    return (
        <>
            <Table>
                <MyTableHead data={headCellData}/>
                <MyTableBody
                    thead={thead}
                    data={data}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </Table>
            {pagination && <TablePagination
                rowsPerPageOptions={paginationRowsCount}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
        </>
    );
};

export default MyTable;