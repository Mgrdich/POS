import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchTables} from "../../actions/posActions";
import {useHistory} from "react-router";

const Pos:React.FC = () => {
    const data=[{name:"hov" , id:0 , number: 1}, {name:"sako" , id:1 , number: 2}, {name:"mgo" , id:2 , number: 3}];
    const tables = useSelector<any>(state => state.pos.tables);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(function () {
        dispatch(fetchTables());
    },[dispatch]);

    console.log(tables);

    return (
        <Grid className="pos-tables" container direction="row" justify="space-around" alignContent="flex-start" wrap='wrap'
        onClick={()=>{(history.push("/tableorder"))}}
        >
            {data.map((table)=>(
                <Grid className="tables" item key={table.id}>
                    <span>{table.number}</span>
                </Grid>
            ))}
        </Grid>
    );
};

export default Pos;