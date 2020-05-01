import React from 'react';
import {TableCell, TableHead, TableRow} from '@material-ui/core/';
import {IMyTableHead} from "../../../interfaces/Reusable";


const MyTableHead: React.FC<IMyTableHead> = (props) => {

    const {data, keys, actionsTypes} = props;
    return (
        <TableHead>
            <TableRow>
                {
                    actionsTypes?.length ?
                        (<TableCell className='table-cell' key="Actions">Actions</TableCell>)
                        : null
                }
                {
                    keys.map(item => (
                        <TableCell className='table-cell' key={item}>{data[item]}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};

export default MyTableHead;