import React, {useEffect} from 'react';
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsGroups, fetchSelectProducts} from "../../actions/posActions";
import ComponentLoader from "../../components/Reusable/ComponentLoader";

const ProductsGroups:React.FC = () => {
    const dispatch = useDispatch();
    const productsGroups:any  = useSelector<any>(state => state.pos.productsGroups.data);
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
                /*onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}*/
            />
            <Grid item container direction="row" justify="space-around">
                <ComponentLoader isLoading={isLoading}>
                    {Object.keys(productsGroups).map((key: string, index: number) => (
                        <Grid className='products-button' key={key} item container justify="center"
                              xs={12}
                              sm={6}
                              md={4}>
                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="outlined"
                                color="primary"
                                type="button"
                                onClick={()=>dispatch(fetchSelectProducts(key))}
                            >
                                {productsGroups[key].name}
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