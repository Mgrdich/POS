import React, {ChangeEvent} from 'react';
import {Grid, Paper, TextField} from "@material-ui/core";
import MenuCard from "../../components/Reusable/MenuCard";
import {useDispatch, useSelector} from "react-redux";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import {filterProducts} from "../../actions/posActions";

const Products: React.FC<any> = () => {
    const products:any = useSelector<any>(state => state.pos.products.filterArray);
    const isLoading:any = useSelector<any>(state => state.pos.products.isLoading);
    const dispatch = useDispatch();

    return (
        <div className="products-container">
        <Paper className="products-scrollable-paper products-paper">
            <TextField
                label="Search Products"
                id="products-search"
                variant="outlined"
                size="small"
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(filterProducts(e.target.value))}
            />
            <ComponentLoader isLoading={isLoading}>
                <Grid item container direction="row" justify="flex-start">
                    {products.length?products.map((product: any, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <MenuCard key={index} products={product}/>
                        </Grid>
                    )):null}
                </Grid>
            </ComponentLoader>
        </Paper>
        </div>
    );
};

export default Products;