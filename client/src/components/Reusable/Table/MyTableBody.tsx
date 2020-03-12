import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableBody} from "../../../interfaces/Reusable";

const MyTableBody: React.FC<IMyTableBody> = (props) => {
    const {page, data, rowsPerPage,keys} = props;
    const [rows, setRows] = useState<any>(data);
    console.log("rows",rows);
    return (
        <>
            <TableBody>
                {
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => (
                        <TableRow key={row._id}>
                            {
                                keys.map((item: any, index: number) => (
                                    <TableCell key={index}>{row[item]}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>


        </>
    );
};

export default MyTableBody;