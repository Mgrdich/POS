import React, {useContext, useEffect} from 'react';
import MyTableHead from "./MyTableHead";
import MyTableBody from "./MyTableBody";
import {Table} from "@material-ui/core";
import {IMyTable} from "../../../interfaces/Reusable";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import MyTablePagination from "./MyTablePagination";
import {MyTableContext} from "./TableProvider";
import {TABLE_ACTIONS} from "./ActionsConfig";


//TODO make the use Pagination hook more reusable

const MyTable: React.FC<IMyTable> = (props) => {

    const {thead, tbody, pagination, paginationRowsCount, keys, actionsTypes, handleActions} = props;
    const dispatch = useContext<any>(MyTableContext)[1];

    useEffect(() => {
        dispatch({
            type: TABLE_ACTIONS.SET_TABLE_DATA,
            payload: {
                thead,
                tbody,
                pagination,
                paginationRowsCount,
                keys,
                actionsTypes,
                handleActions,
                count: tbody.length
            }
        })
    }, [thead, tbody, pagination, paginationRowsCount, keys, actionsTypes, handleActions, dispatch])

    return (
        <Paper className='table-container'>
            <TableContainer>
                <Table>
                    <MyTableHead/>
                    <MyTableBody/>
                </Table>
            </TableContainer>
            {pagination && <MyTablePagination

            />}
        </Paper>
    );
};

export default MyTable;