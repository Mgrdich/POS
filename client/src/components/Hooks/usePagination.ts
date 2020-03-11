import React, {useState} from "react";

export function usePagination(pageCount = 0, rowsPerPageCount = 5){
    const [page, setPage] = useState<number>(pageCount);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageCount);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage};
}