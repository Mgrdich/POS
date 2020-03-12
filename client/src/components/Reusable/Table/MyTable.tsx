import React from 'react';
import MyTableHead from "./MyTableHead";
import MyTableBody from "./MyTableBody";
import {Table, TablePagination} from "@material-ui/core";
import {usePagination} from "../../Hooks/usePagination";
import {IMyTable} from "../../../interfaces/Reusable";


//TODO make the use Pagination hook more reusable

const MyTable: React.FC<IMyTable> = (props) => {

    const {thead, data, pagination, paginationRowsCount,keys,loading} = props;
    const {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = usePagination();

    return (
        <>
            <Table>
                <MyTableHead data={thead} keys={keys}/>
                <MyTableBody
                    keys={keys}
                    data={data}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
            </Table>
        </>
    );
};

export default MyTable;