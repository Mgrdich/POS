import React, {useState} from 'react';
import {TableHead, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableHead} from "../../../interfaces/Reusable";


const MyTableHead: React.FC<IMyTableHead> = (props) => {

    const {data,keys} = props;

    const [thead, setThead] = useState<Array<string>>(data);
    return (
        <>
            <TableHead>
                <TableRow>
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