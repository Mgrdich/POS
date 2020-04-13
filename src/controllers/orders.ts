import {NextFunction, Request, Response} from "express";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {NO_SUCH_DATA_EXISTS} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {validationResult} from "express-validator";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {noResult} from "../utilities/controllers/helpers";
import {Orders} from "../models/Orders";
import {IDocOrders} from "../interfaces/models/Orders";
import {Tables} from "../models/Tables";
import {ITables} from "../interfaces/models/Tables";
import {IProductsGroups} from "../interfaces/models/ProductsGroups";
import {ProductsGroups} from "../models/ProductsGroups";

export async function getOrders(req: Request, res: Response, next: NextFunction): Promise<any> {
    try { //TODO transformed to a function with Generics GET /  GET/:id  delete/:id delete /
        let orders: Array<IDocOrders> | IDocOrders = await Orders.find({},{_id:1,table:1}).lean();
        if (orders.length) {
            return res.status(200).json(orders);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getPosTables(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let posTables: Array<ITables> = await Tables.find({},{_id:1,number:1,status:1}).lean();
        if (posTables.length) {
            return res.status(200).json(posTables);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getPosProductsGroups(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let posProductsGroups: Array<IProductsGroups> = await ProductsGroups.find({},{_id:1,name:1}).lean();
        if (posProductsGroups.length) {
            return res.status(200).json(posProductsGroups);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getPosProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        let posProductsGroups: IProductsGroups =
            await ProductsGroups.findById(req.params.productsGroupId,{_id:1})
            .lean().populate({path:'products',select:'name price'});
        if (posProductsGroups) {
            return res.status(200).json(posProductsGroups);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}


export async function getOrder(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let order: IDocOrders = await Orders.findById(req.params.id, {
            price:1,
            orders:1
        }).lean().populate({
            path:'orders._id',
            select:'data price',
            populate:{
                path:'data.product',
                select:'group name price'
            }
        });
        if (!order) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422); //TODO check the validity
        }
        let formalizeOrder = order.orders;
        let dataOrders:Array<any> = [];

        for (let i = 0; i < formalizeOrder.length ; i++) { //TODO mix the TODO with reduce
            dataOrders = [...dataOrders,...formalizeOrder[i]._id.data]
        }

        dataOrders = dataOrders.reduce(function (acc:any,curr:any) {
            let obj:any = {...acc};
            obj[curr.product._id] = {
                _id:curr.product._id,
                quantity:curr.quantity,
                productGroupId:curr.product.group,
                price:curr.product.price,
                name:curr.product.name
            };
            return obj
        },{});


        let orderJson = {
          _id:order._id ,
          orders:dataOrders,
          waiter:order.waiter
        };
        return res.status(200).json(orderJson);
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
        const order: IDocOrders = new Orders({table, waiter, createdBy: req.user._id});
        const ord: IDocOrders = await (await order.save())
            .populate('waiter', 'name').populate('createdBy', 'name').execPopulate();
        res.status(200).json({_id: ord._id, waiter: ord.waiter, createdBy: ord.createdBy})
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
        const {orders, waiter} = req.body; //TODO validation within Search Order
        const currentOrder: IDocOrders = await Orders.findById(req.params.id);
        await currentOrder.editOrder(req.user._id, waiter, orders);
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
        /*
                if (response.ok) {
                    alert(res, 200, messageAlert.success, ITEM_DELETED);
                } else {
                    alert(res, 304, messageAlert.success, NOT_MODIFIED)
                }
        */
    } catch (err) {
        errorCatcher(next, err);
    }
}