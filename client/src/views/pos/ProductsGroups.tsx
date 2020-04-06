import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsGroups, fetchSelectProducts, filterProductsGroup} from "../../actions/posActions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const ProductsGroups:React.FC = () => {
    const dispatch = useDispatch();
    const productsGroups:any  = useSelector<any>(state => state.pos.productsGroups.filterArray);
    const isLoading:any  = useSelector<any>(state => state.pos.productsGroups.isLoading);

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
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(filterProductsGroup(e.target.value))}
            />
            <Grid item container direction="row" justify="flex-start">
                <ComponentLoader isLoading={isLoading}>
                    {productsGroups.map((item:any, index: number) => (
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
                    ))}

                </ComponentLoader>
            </Grid>
        </Paper>
        </div>
    );
};

export default ProductsGroups;