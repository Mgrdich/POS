import React from 'react';
import {Grid} from "@material-ui/core";

const Pos:React.FC = () => {
    const data=[{name:"hov" , id:0 , number: 1}, {name:"sako" , id:1 , number: 2}, {name:"mgo" , id:2 , number: 3}];
    return (
        <Grid className="pos-tables" container direction="row" justify="space-around" alignContent="flex-start" wrap='wrap'>
            {data.map((table)=>(
                <Grid className="tables" item key={table.id}>
                    <span>{table.number}</span>
                </Grid>
            ))}
        </Grid>
    );
};

export default Pos;