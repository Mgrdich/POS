import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableBody} from "../../../interfaces/Reusable";
import DeleteIcon from "@material-ui/icons/Delete";


const MyTableBody: React.FC<IMyTableBody> = (props) => {
    const {page, data, rowsPerPage, keys, actionsTypes, handleActions} = props;
    const [rows, setRows] = useState<any>(data);

    return (
        <>

            <TableBody>
                {
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                        <TableRow key={row._id}>
                            {actionsTypes ? <TableCell key={actionsTypes[0]}>
                                {
                                    actionsTypes?.map((item: string) => {
                                        switch (item) {
                                            case 'delete':
                                                return (
                                                    <DeleteIcon key={item} style={{cursor: 'pointer'}}
                                                                onClick={() => (props.handleActions) ? props.handleActions('delete', {_id: row._id}) : null}/>
                                                );
                                            case 'edit':
                                                return (
                                                    <></>
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