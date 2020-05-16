import React, {useContext} from 'react';
import {TablePagination} from "@material-ui/core";
import {MyTableContext} from "./TableProvider";
import {TABLE_ACTIONS} from "./ActionsConfig";

const MyTablePagination = () => {
    const [state, dispatch] = useContext<any>(MyTableContext);
    const {paginationRowsCount, count, rowsPerPage,  page} = state;
    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch({type:TABLE_ACTIONS.SET_PAGE, payload:newPage});
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type:TABLE_ACTIONS.SET_PAGE, payload:0});
        dispatch({type:TABLE_ACTIONS.SET_ROWS_PER_PAGE, payload:+event.target.value});
    };

    return (
        <TablePagination
            rowsPerPageOptions={paginationRowsCount}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
};

export default MyTablePagination;