import React, {useEffect} from 'react';
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsGroups} from "../../actions/posActions";

const ProductsGroups = (props: any) => {
    const {products} = props;
    const dispatch = useDispatch();
    const productsGroups  = useSelector<any>(state => state.pos.productsGroups.data);
    const isLoading  = useSelector<any>(state => state.pos.productsGroups.isLoading);

    useEffect(function () {
        dispatch(fetchProductsGroups());
    },[dispatch]);

    return (
        <Paper className="products-paper">
            <div className="products-header">
                <h1>Menu</h1>
            </div>
            <TextField
                label="Search"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                /*onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}*/
            />
            <Grid item container direction="row" justify="space-around">
                {products ? products.map((product: string, index: number) => (
                    <Grid className='products-button' key={index} item container justify="center" xs={12}
                          sm={6}
                          md={4}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="outlined"
                            color="primary"
                        >
                            {product}
                        </Button>
                    </Grid>
                )) : []}
            </Grid>
        </Paper>

    );
};

export default ProductsGroups;