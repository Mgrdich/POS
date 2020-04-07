import React, {useEffect} from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, fetchTables} from "../../actions/posActions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {useHistory} from "react-router";
import ErrorHandler from "../errors/ErrorHandler";
import ChosenEmployee from "./ChosenEmployee";

const Pos: React.FC = () => {
    const tables: any = useSelector<any>(state => state.pos.tables.data);
    const isLoading = useSelector<any>(state => state.pos.tables.isLoading);
    const error = useSelector<any>(state => state.pos.error);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(function () {
        dispatch(fetchTables());
        dispatch(fetchOrders())
    }, [dispatch]);

    return (
        <div>
            <div><ChosenEmployee click={true} users={["sako", "mgo", "hovik"]}/></div>
            <Grid className="pos-tables" container direction="row" justify="space-around" alignContent="flex-start"
                  wrap='wrap'>
                <ErrorHandler error={error as boolean}>
                    <ComponentLoader isLoading={isLoading as boolean}>
                        {tables.map((table: any) => (
                            <div className="tables" key={table._id}>
                                <Button key={table.id} onClick={() => {
                                    (history.push(`/pos/${table._id}`))
                                }}>
                                    <span>{table.number}</span>
                                </Button>
                            </div>
                        ))}
                    </ComponentLoader>
                </ErrorHandler>
            </Grid>
        </div>
    );
};

export default Pos;