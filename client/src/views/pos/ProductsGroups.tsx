import React from 'react';
import {Button, Grid, Paper, TextField} from "@material-ui/core";

const ProductsGroups = (props: any) => {
    const {products} = props;
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