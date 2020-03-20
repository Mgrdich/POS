import React from 'react';
import {TableCell, TableHead, TableRow} from '@material-ui/core/';
import {IMyTableHead} from "../../../interfaces/Reusable";


const MyTableHead: React.FC<IMyTableHead> = (props) => {

    const {data, keys, actionsTypes} = props;
    return (
        <>
            <TableHead>
                <TableRow>
                    {
                        actionsTypes?.map((item) =>
                            (<TableCell key={item}>{item}</TableCell>)
                        )
                    }
                    {
                        keys.map(item => (
                            <TableCell key={item}>{data[item]}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        </>
    );
};

export default MyTableHead;