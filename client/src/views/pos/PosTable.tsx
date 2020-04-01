import React from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import MenuCard from "../../components/Reusable/MenuCard";

const PosTable = () => {
    const products = ['Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads', 'Drinks', 'appetizers', 'salads',];
    const productsList = [{id:1, name:"fatoush",price:1000}, {id:2, name:"summer",price:1000}, {id:3, name:"taboule",price:1200},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},{id:1, name:"fatoush",price:1000},];
    return (
        <div>
            <Grid container direction='row' justify="space-around">
                <Grid item xs={12} sm={5}>
                    <Paper style={{marginTop: '15px'}}>
                        <div className="products-header">
                            <h1>Table order</h1>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{marginTop: '15px'}}>
                        <div className="products-header">
                            <h1>Menu</h1>
                        </div>
                        <Grid item container direction='row' justify='space-around'>
                            {products.map((product: string, index: number) => (
                                <Grid className='products-button' key={index} item container justify="center" xs={12}
                                      sm={6}
                                      md={4}>
                                    <Button
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {product}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid  item container direction='row' justify="space-around">
                            {productsList.map((product:any,index:number)=>(
                                <Grid item xs={12} sm={6} md={4}>
                                    <MenuCard key={index} sako={product} image={true}/>

                                </Grid>

                            ))}

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default PosTable;