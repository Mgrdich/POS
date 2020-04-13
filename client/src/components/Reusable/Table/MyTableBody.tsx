import React from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableBody} from "../../../interfaces/Reusable";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";


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
                                    actionsTypes?.map((item: string) => {

                                        switch (item) {
                                            case 'Delete':
                                                return (
                                                    <IconButton key={item}
                                                                onClick={() => (handleActions) ? handleActions('delete', {...row}) : null}>
                                                        <DeleteIcon color='primary'/>
                                                    </IconButton>
                                                );

                                            case 'Edit':
                                                return (
                                                    <IconButton key={item}
                                                                onClick={() => (handleActions) ? handleActions('edit', {...row}) : null}>
                                                        <EditIcon color='primary'/>
                                                    </IconButton>
                                                );
                                            default:
                                                break
                                        }
                                    })
                                }
                            </TableCell> : null}
                            {
                                keys.map((item: any, index: number) => (
                                        <TableCell key={index}> {row[item]}</TableCell>
                                    )
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