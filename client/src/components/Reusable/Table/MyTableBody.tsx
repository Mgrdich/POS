import React, {useContext} from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from "@material-ui/core/IconButton";
import {TableActionOptions} from "../../../constants/Enums/General";
import Tooltip from "@material-ui/core/Tooltip";
import {MyTableContext} from "./TableProvider";

/*function disableActionObj(actionType:TableActionOptions,actionsDisableOptions:IActionsOptions) {

}*/

const MyTableBody: React.FC = () => {
    const [state] = useContext<any>(MyTableContext);
    const {page, tbody, rowsPerPage, keys, actionsTypes, handleActions} = state;

    return (
            <TableBody>
                {
                    tbody.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                        <TableRow key={row._id}>
                            {actionsTypes ? <TableCell className='table-cell' key={row._id+"actionType"}>
                                {
                                    actionsTypes?.map((item: TableActionOptions) => {

                                        switch (item) {
                                            case TableActionOptions.delete:
                                                return (
                                                    <Tooltip title="Delete" placement="top" arrow
                                                             key={item + row._id}>
                                                        <IconButton key={item + row._id}
                                                                    onClick={() => (handleActions) ? handleActions(TableActionOptions.delete, {...row}) : null}
                                                        >
                                                            <DeleteIcon color='primary'/>
                                                        </IconButton>
                                                    </Tooltip>
                                                );

                                            case TableActionOptions.edit:
                                                return (
                                                    <Tooltip title="Edit" placement="top" arrow
                                                             key={item + row._id}>
                                                        <IconButton key={item + row._id}
                                                                    onClick={() => (handleActions) ? handleActions(TableActionOptions.edit, {...row}) : null}
                                                        >
                                                            <EditIcon color='primary'/>
                                                        </IconButton>
                                                    </Tooltip>
                                                );

                                            case TableActionOptions.closed:
                                                return (
                                                    <Tooltip title="Close" placement="top" arrow
                                                             key={item + row._id}>
                                                        <IconButton
                                                            onClick={() => (handleActions) ? handleActions(TableActionOptions.closed, {...row}) : null}
                                                        >
                                                            <RestaurantIcon color='primary'/>
                                                        </IconButton>
                                                    </Tooltip>
                                                );

                                            case TableActionOptions.reserved:
                                                return (
                                                    <Tooltip title="Reserve" placement="top" arrow
                                                             key={item + row._id}>
                                                        <IconButton
                                                            onClick={() => (handleActions) ? handleActions(TableActionOptions.reserved, {...row}) : null}
                                                        >
                                                            <LockIcon color='primary'/>
                                                        </IconButton>
                                                    </Tooltip>
                                                );
                                            default:
                                                break
                                        }
                                    })
                                }
                            </TableCell> : null}
                            {
                                keys.map((item: any) => {
                                        return (<TableCell key={item+row._id}> {row[item]}</TableCell>)
                                    }
                                )
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
    );
};

export default MyTableBody;