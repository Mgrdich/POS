import React, {useState} from 'react';
import {TableHead, TableCell, TableRow} from '@material-ui/core/';
import {IMyTableHead} from "../../../interfaces/Reusable";


const MyTableHead: React.FC<IMyTableHead> = (props) => {

    const {data} = props;

    const [thead, setThead] = useState<Array<string>>(data);
    return (
        <>
            <TableHead>
                <TableRow>
                    {
                        thead.map(item => (
                            <TableCell key={item}>{item}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        </>
    );
};

export default MyTableHead;