import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
// import axios from 'axios'
import {IMyTableBody} from "../../../interfaces/Reusable";
import DeleteIcon from '@material-ui/icons/Delete';
import AlertQuestion from "../AlertQuestion";
import {useAlert} from "../../Hooks/useAlert";


const MyTableBody: React.FC<IMyTableBody> = (props) => {
    const {page, data, rowsPerPage, keys} = props;
    const [rows, setRows] = useState<any>(data);
    const {alertMessage, setOpenAlert, openAlert, id, setId} = useAlert('Are you sure you want to delete this row!');

    const handleDeleteRow = (id: any) => {
        setOpenAlert(true);
        setId(id);
        // axios.delete(`/users/${id}`).then(() => {
        //     console.log('deleted')
        // }).catch((e) => {
        //   console.log(e)
        // });
    };

    return (
        <>

            <TableBody>
                {
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                        <TableRow key={row._id}>
                            <TableCell key={row._id}>
                                <DeleteIcon style={{cursor: 'pointer'}} onClick={() => handleDeleteRow(row._id)}/>
                                <AlertQuestion open={openAlert} close={setOpenAlert} id={id} data={rows}
                                               setData={setRows}>
                                    {alertMessage}
                                </AlertQuestion>
                            </TableCell>
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