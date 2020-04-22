import {NextFunction, Response,Request} from "express";
import {IProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {noResult} from "../utilities/controllers/helpers";
import {IClosedOrders} from "../interfaces/models/ClosedOrders";
import {ClosedOrders} from "../models/ClosedOrders";

export async function getProductsPrice(req: Request, res: Response, next: NextFunction) {
    const productPrice:Array<IProducts> = await Products.find({},{name:1,price:1}).lean();
    if(!productPrice.length){
        return noResult(res);
    }
    res.status(200).json(productPrice);
}

/**
 * closed orders prices for which table has more income
 *
 * */
export async function getClosedOrdersPricesTables(req: Request, res: Response, next: NextFunction) { //TODO add with date Filter
    const closedOrders:Array<IClosedOrders> = await ClosedOrders.find({},{price:1,table:1});
    if(!closedOrders.length){
        return noResult(res);
    }
    res.status(200).json(closedOrders);
}


export async function getClosedOrdersWaiter(req: Request, res: Response, next: NextFunction) {

}