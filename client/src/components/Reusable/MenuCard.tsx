import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography} from "@material-ui/core";
import {IMenuCard} from "../../interfaces/Reusable";



const MenuCard: React.FC<IMenuCard> = (props) => {
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
                        <Tooltip title={products.name} placement="top" arrow>
                            <Typography className="ellipses">{products.name}</Typography>
                        </Tooltip>
                        <Typography>{products.price}</Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default MenuCard;