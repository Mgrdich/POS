import React, {useEffect} from 'react';
import {Button, Grid} from "@material-ui/core";
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
        <Grid container direction="row" justify="space-around" alignContent="flex-start" wrap='wrap'>
            {data.map((table)=>(
                <div className="tables">
                <Button  key={table.id} onClick={()=>{(history.push("/pos/id"))}}>
                    <span>{table.number}</span>
                </Button>
                </div>
            ))}
        </Grid>
    );
};

export default Pos;