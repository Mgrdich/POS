import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

const MenuCard : React.FC<any>= (props:any) => {
    const {sako, image}=props
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
                                        <Typography>{sako.name}</Typography>
                                        <Typography>{sako.price}</Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                    </div>

    );
};

export default MenuCard;