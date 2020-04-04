import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS, NOT_MODIFIED} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {validationResult} from "express-validator";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {tableDataNormalize} from "../utilities/reformaters";
import {GET_PRODUCTS_TABLE} from "../utilities/tables/constants";
import {noResult} from "../utilities/controllers/helpers";
import {Orders} from "../models/Orders";
import {IDocOrders} from "../interfaces/models/Orders";

export async function getOrders(req: Request, res: Response, next: NextFunction): Promise<any> {
    try { //TODO transformed to a function with Generics GET /  GET/:id  delete/:id delete /
        let orders: Array<IDocOrders> | IDocOrders = await Orders.find({});
        if (orders.length) {
            const tableProducts = tableDataNormalize(orders, GET_PRODUCTS_TABLE);
            return res.status(200).json(tableProducts);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let order: IDocOrders = await Orders.findById(req.params.id,{createdDate:0,createdBy:0,table:0}).populate('orders._id');
        if (!order) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422); //TODO check the validity
        }
        return res.status(200).json(order);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function addOrder(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {table, waiter} = req.body; //TODO Validation then this step
        const order: IDocOrders = new Orders({table, waiter,createdBy:req.user._id});
        const ord:IDocOrders =  await (await order.save())
            .populate('waiter','name').populate('createdBy','name').execPopulate();
        res.status(200).json({_id:ord._id,waiter:ord.waiter,createdBy:ord.createdBy})
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function editOrders(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {orders,waiter} = req.body; //TODO validation within Search Order
        const currentOrder:IDocOrders = await Orders.findById(req.params.id);
        await currentOrder.editOrder(req.user._id,waiter,orders);
        alert(res, 200, messageAlert.success, 'Order is Edited');
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function deleteOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        await Orders.deleteOrderById(req.params.id);

    } catch (err) {
        errorCatcher(next, err);
    }
}