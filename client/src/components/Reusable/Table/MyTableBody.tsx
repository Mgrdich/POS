import React from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableBody} from "../../../interfaces/Reusable";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from "@material-ui/core/IconButton";
import {TableActionOptions} from "../../../constants/Enums/General";
import Tooltip from "@material-ui/core/Tooltip";

/*function disableActionObj(actionType:TableActionOptions,actionsDisableOptions:IActionsOptions) {

}*/

const MyTableBody: React.FC<IMyTableBody> = (props) => {
    const {page, data, rowsPerPage, keys, actionsTypes, handleActions} = props;

    return (
        <>

            <TableBody>
                {
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                        <TableRow key={row._id}>
                            {actionsTypes ? <TableCell className='table-cell' key={actionsTypes[0]}>
                                {
                                    actionsTypes?.map((item: TableActionOptions) => {

                                        switch (item) {
                                            case TableActionOptions.delete:
                                                return (
                                                    <IconButton key={item+row._id}
                                                                onClick={() => (handleActions) ? handleActions(TableActionOptions.delete, {...row}) : null}
                                                    >
                                                        <DeleteIcon color='primary'/>
                                                    </IconButton>
                                                );

                                            case TableActionOptions.edit:
                                                return (
                                                    <IconButton key={item+row._id}
                                                                onClick={() => (handleActions) ? handleActions(TableActionOptions.edit, {...row}) : null}
                                                    >
                                                        <EditIcon color='primary'/>
                                                    </IconButton>
                                                );

                                            case TableActionOptions.closed:
                                                return (
                                                    <Tooltip title="Close table" placement="top" arrow>
                                                    <IconButton key={item+row._id}
                                                                onClick={() => (handleActions) ? handleActions(TableActionOptions.closed, {...row}) : null}
                                                    >
                                                        <RestaurantIcon color='primary'/>
                                                    </IconButton>
                                                    </Tooltip>
                                                );

                                            case TableActionOptions.reserved:
                                                return (
                                                    <Tooltip title="Reserve table" placement="top" arrow>
                                                    <IconButton key={item+row._id}
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
                                keys.map((item: any,index:number) => {
                                        return (<TableCell key={item+index+row._id}> {row[item]}</TableCell>)
                                    }
                                )
                            }
                        </TableRow>
                    ))
                }
            </TableBody>

        </>
    );
};

export default MyTableBody;