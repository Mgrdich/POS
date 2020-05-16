import React, {useContext} from 'react';
import {TableCell, TableHead, TableRow} from '@material-ui/core/';
import {MyTableContext} from "./TableProvider";


const MyTableHead: React.FC = () => {
    const [state] = useContext<any>(MyTableContext);
    const {thead, keys, actionsTypes} = state;
    return (
        <TableHead>
            <TableRow>
                {
                    actionsTypes?.length ?
                        (<TableCell className='table-cell' key="Actions">Actions</TableCell>)
                        : null
                }
                {
                    keys.map((item: any) => (
                        <TableCell className='table-cell' key={item}>{thead[item]}</TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
};

export default MyTableHead;