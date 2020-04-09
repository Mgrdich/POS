import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsGroups, fetchSelectProducts} from "../../actions/posActions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const ProductsGroups:React.FC = () => {
    const dispatch = useDispatch();
    let [initArray,setArray] = useState<Array<any>>([]);
    const [filteredArray,setFilterArray] = useState<Array<any>>(initArray);
    const productsGroups:any  = useSelector<any>(state => state.pos.productsGroups.data);
    const isLoading:any  = useSelector<any>(state => state.pos.productsGroups.isLoading);

    useEffect(function () {
        let initial:Array<any> = Object.keys(productsGroups).map((item:any)=>productsGroups[item]);
        setArray(initial);
        setFilterArray(initial);
    },[productsGroups]);

    const filter = useCallback(function (match:string) {
        const filteredUsers: Array<any> = initArray.filter((item: any) => item.name.toLowerCase().includes(match.toLowerCase().trim()));
        setFilterArray(filteredUsers);
    },[initArray]);

    useEffect(function () {
        dispatch(fetchProductsGroups());
    },[dispatch]);

    return (
        <div className="product-groups-container">
        <Paper className="products-paper">
            <div className="products-header">
                <h1>Menu</h1>
            </div>
            <TextField
                label="Search"
                id="products-group-search"
                variant="outlined"
                size="small"
                onChange={(e: ChangeEvent<HTMLInputElement>) => filter(e.target.value)}
            />
            <Grid item container direction="row" justify="flex-start">
                <ComponentLoader isLoading={isLoading}>
                    {filteredArray.length?filteredArray.map((item:any, index: number) => (
                        <Grid className='products-button' key={item._id} item container justify="center"
                              xs={12}
                              sm={6}
                              md={4}>
                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="outlined"
                                color="primary"
                                type="button"
                                onClick={()=>dispatch(fetchSelectProducts(item._id))}
                            >
                                {item.name}
                            </Button>
                        </Grid>
                    )):null}

                </ComponentLoader>
            </Grid>
        </Paper>
        </div>
    );
};

export default ProductsGroups;