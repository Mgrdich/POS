import React from 'react';
import {TablePagination} from "@material-ui/core";

const MyTablePagination = (props:any) => {
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={props.rows.length}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
        />
    );
};

export default MyTablePagination;