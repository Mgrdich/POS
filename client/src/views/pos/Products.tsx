import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import MenuCard from "../../components/Reusable/MenuCard";
import {useFilter} from "../../components/Hooks/useFilter";
import {setUnSubmittedOrder} from "../../actions/posActions";

const Products: React.FC<any> = () => {
    const products:any = useSelector<any>(state => state.pos.products.data);
    const isLoading:any = useSelector<any>(state => state.pos.products.isLoading);
    const productGroupId:any = useSelector<any>(state => state.pos.productsGroup);
    const dispatch = useDispatch();
    const {filteredArray,filter} = useFilter(products);

    return (
        <div className="products-container">
        <Paper className="products-scrollable-paper products-paper">
            <TextField
                label="Search Products"
                id="products-search"
                variant="outlined"
                size="small"
                onChange={(e: ChangeEvent<HTMLInputElement>) => filter(e.target.value)}
            />
            <ComponentLoader isLoading={isLoading}>
                <Grid item container direction="row" justify="flex-start">
                    {filteredArray.length?filteredArray.map((product: any, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <MenuCard key={index} products={product} onClick={()=>dispatch(setUnSubmittedOrder(product._id,productGroupId))}/>
                        </Grid>
                    )):null}
                </Grid>
            </ComponentLoader>
        </Paper>
        </div>
    );
};

export default Products;