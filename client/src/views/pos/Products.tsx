import React, {useEffect} from 'react';
import {Grid, Paper, TextField} from "@material-ui/core";
import MenuCard from "../../components/Reusable/MenuCard";
import {useDispatch} from "react-redux";
import {fetchProductsGroups} from "../../actions/posActions";

const Products: React.FC<any> = (props: any) => {
    const {productsList} = props;
    const dispatch = useDispatch();

    return (
        <Paper className="products-scrollable-paper products-paper">
            <TextField
                label="Search Products"
                id="products-search"
                variant="outlined"
                size="small"
                /*onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}*/
            />

            <Grid item container direction="row" justify="space-around">
                {productsList ? productsList.map((product: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <MenuCard key={index} products={product}/>

                    </Grid>

                )) : []}

            </Grid>
        </Paper>
    );
};

export default Products;