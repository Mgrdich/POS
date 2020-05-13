import React from 'react';
import {TablePagination} from "@material-ui/core";

const MyTablePagination = (props:any) => {
    return (
        <TablePagination
            rowsPerPageOptions={props.rowsPerPageOptions}
            component="div"
            count={props.count}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onChangePage={props.onChangePage}
            onChangeRowsPerPage={props.onChangeRowsPerPage}
        />
    );
};

export default MyTablePagination;