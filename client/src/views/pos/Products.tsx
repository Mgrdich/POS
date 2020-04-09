import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Grid, Paper, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import ComponentLoader from "../../components/Reusable/ComponentLoader";
import MenuCard from "../../components/Reusable/MenuCard";

const Products: React.FC<any> = () => {
    let [initArray,setArray] = useState<Array<any>>([]);
    const [filteredArray,setFilterArray] = useState<Array<any>>(initArray);
    const products:any = useSelector<any>(state => state.pos.products.data);
    const isLoading:any = useSelector<any>(state => state.pos.products.isLoading);

    useEffect(function () {
        let initial = Object.keys(products).map((item:any)=>products[item]);
        setArray(initial);
        setFilterArray(initial);
    },[products]);

    const filter = useCallback(function (match:string) {
        const filteredUsers: Array<any> = initArray.filter((item: any) => item.name.toLowerCase().includes(match.toLowerCase().trim()));
        setFilterArray(filteredUsers);
    },[initArray]);

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