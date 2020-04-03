import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

const MenuCard : React.FC<any>= (props:any) => {
    const {products, image}=props
    return (
                    <div className="menu-card ">
                            <Card>
                                <CardActionArea>
                                   {image && <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                    />}
                                    <CardContent className={` ${image ? '' : 'image'}`}>
                                        <Typography>{products.name}</Typography>
                                        <Typography>{products.price}</Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </div>

    );
};

export default MenuCard;