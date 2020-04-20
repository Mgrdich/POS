import {NextFunction, Response,Request} from "express";
import {IProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {noResult} from "../utilities/controllers/helpers";

export async function getProductsPrice(req: Request, res: Response, next: NextFunction) {
    const productPrice:Array<IProducts> = await Products.find({},{name:1,price:1}).lean();
    if(!productPrice.length){
        return noResult(res);
    }
    res.status(200).json(productPrice);
}

export async function getOrdersPricesTables(req: Request, res: Response, next: NextFunction) {

}


export async function getOrdersWaiter(req: Request, res: Response, next: NextFunction) {

}