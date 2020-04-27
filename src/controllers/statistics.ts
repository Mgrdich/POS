import {NextFunction, Response,Request} from "express";
import {IProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {getDateRange, noResult} from "../utilities/controllers/helpers";
import {IClosedOrders} from "../interfaces/models/ClosedOrders";
import {ClosedOrders} from "../models/ClosedOrders";
import {priceSumWithClosedOrders} from "../utilities/reformaters";
import {errorCatcher,errorValidation} from "../utilities/controllers/error";
import {IRange} from "../interfaces/General";

export async function getProductsPrice(req: Request, res: Response, next: NextFunction) { //TODO add something for date ranges hanlder
    try {
        errorValidation(req);
        let range:IRange = getDateRange(req.query.date);
        const productPrice: Array<IProducts> =
            await Products.find({createdAt:{$gte:range.gt,$lt:range.lt}},
                {name: 1, price: 1}).limit(10).lean();
        if (!productPrice.length) {
            return noResult(res);
        }
        res.status(200).json(productPrice);
    } catch (err) {
        errorCatcher(next, err);
    }
}

/**
 * closed orders prices for which table has more income
 *
 * */

export async function getClosedOrdersPricesTables(req: Request, res: Response, next: NextFunction) { //TODO add with date Filter
    try {
        errorValidation(req);
        let range:IRange = getDateRange(req.query.time);
        const closedOrders: Array<IClosedOrders> =
            await ClosedOrders.find({createdAt:{$gte:range.gt,$lt:range.lt}},
                {price: 1, table: 1}).limit(10).populate('table', 'number');
        if (!closedOrders.length) {
            return noResult(res);
        }

        let orderHash: any = {
            //tableId:arrayIndex
        };

        const getClosedOrdersPricesTables: Array<{ price: number, number: number, total: number }> =
            closedOrders.reduce(function (acc: Array<{ price: number, number: number, total: number }>, item: IClosedOrders, index: number) {
                let arr: any = [...acc];
                let tableId: string = item.table._id;
                let tableNumber: number = item.table.number;
                if (!orderHash[tableId] && orderHash[tableId] !== 0) { //ignore the index is zero  sum is not calculated
                    orderHash[tableId] = index; //hashing it
                    arr.push({number: tableNumber, price: item.price, total: 1});
                    return arr;
                }
                let indexArray = orderHash[tableId];
                arr[indexArray].price = arr[indexArray].price + item.price;
                arr[indexArray].total += 1; //over how many elements
                return arr;
            }, []);

        res.status(200).json(getClosedOrdersPricesTables);
    }catch (err) {
        errorCatcher(next, err);
    }
}

/**
 * closed orders prices for which waiter has more income
 *
 * */

export async function getClosedOrdersWaiter(req: Request, res: Response, next: NextFunction) { //TODO add with date Filter
    try {
        errorValidation(req);
        let range:IRange = getDateRange(req.query.time);
        const closedOrders: Array<IClosedOrders> =
            await ClosedOrders.find({createdAt:{$gte:range.gt,$lt:range.lt}},
                {waiter: 1, price: 1}).limit(10).lean().populate('waiter', 'name');
        if (!closedOrders.length) {
            return noResult(res);
        }

        let getClosedOrdersOrdersWaiter = priceSumWithClosedOrders(closedOrders, {aliasName: 'waiter', key: 'name'});
        res.status(200).json(getClosedOrdersOrdersWaiter);
    }catch (err) {
        errorCatcher(next,err);
    }
}

/**
 * closed orders prices for which cashier has more income
 *
 * */

export async function getClosedOrdersCashier(req: Request, res: Response, next: NextFunction) { //TODO add with date Filter
    try {
        errorValidation(req);
        let range:IRange = getDateRange(req.query.time);
        const closedOrders: Array<IClosedOrders> =
            await ClosedOrders.find({createdAt:{$gte:range.gt,$lt:range.lt}},
                {createdBy: 1, price: 1}).limit(10).lean().populate('createdBy', 'name');
        if (!closedOrders.length) {
            return noResult(res);
        }
        let getClosedOrdersOrdersWaiter = priceSumWithClosedOrders(closedOrders, {aliasName: 'createdBy', key: 'name'});
        res.status(200).json(getClosedOrdersOrdersWaiter);
    } catch (err) {
        errorCatcher(next, err);
    }
}

