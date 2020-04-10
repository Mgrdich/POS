import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";

const MenuCard: React.FC<any> = (props: any) => { //TODO interface
    const {products, image,onClick} = props;
    return (
        <div className="menu-card " onClick={onClick}>
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