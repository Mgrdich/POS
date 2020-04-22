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
    const closedOrders:Array<IClosedOrders> = await ClosedOrders.find({},{price:1,table:1}).populate('table','number');
    if(!closedOrders.length){
        return noResult(res);
    }

    let orderHash:any = {
     //tableId:arrayIndex
    };

    const getClosedOrdersPricesTables:Array<{price:number,number:number,total:number}> =
        closedOrders.reduce(function (acc: Array<{ price: number, number: number }>, item: IClosedOrders, index: number) {
            let arr: any = [...acc];
            let tableId: string = item.table._id;
            let tableNumber: number = item.table.number;
            if (!orderHash[tableId] && orderHash[tableId] !== 0) { //ignore the index is zero  sum is not calculated
                orderHash[tableId] = index; //hashing it
                arr.push({number: tableNumber, price: item.price,total:1});
                return arr;
            }
            let indexArray = orderHash[tableId];
            arr[indexArray].price = arr[indexArray].price + item.price;
            arr[indexArray].total +=1; //over how many elements
            return arr;
        }, []);

    res.status(200).json(getClosedOrdersPricesTables);
}


export async function getClosedOrdersWaiter(req: Request, res: Response, next: NextFunction) {

}