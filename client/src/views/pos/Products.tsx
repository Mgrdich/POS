import React from 'react';
import {Grid, Paper, TextField} from "@material-ui/core";
import MenuCard from "../../components/Reusable/MenuCard";

const Products:React.FC<any> = (props: any) => {
    const{productsList} = props;
    return (
            <Paper className="products-scrollable-paper products-paper" >
                <TextField
                    label="Search Products"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    className="products-search"
                    /*onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}*/
                />

                <Grid  item container direction="row" justify="space-around">
                    {productsList ? productsList.map((product:any,index:number)=>(
                        <Grid item xs={12} sm={6} md={4}>
                            <MenuCard key={index} products={product}/>

                        </Grid>

                    )): []}

                </Grid>
            </Paper>
    );
};

export default Products;