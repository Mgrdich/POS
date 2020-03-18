import {NextFunction, Request, Response} from "express";
import {noResult} from "../utilities/controllers/helpers";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {NO_SUCH_DATA_EXISTS} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {validationResult} from "express-validator";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";
import {ProductsGroups} from "../models/ProductsGroups";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";

export async function getProductsGroups(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let productsGroups: Array<IDocProductsGroups> | IDocProductsGroups = await ProductsGroups.find({});
        if (productsGroups.length) {
            return res.status(200).json(productsGroups);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getProductsGroup(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let productsGroups:IDocProductsGroups = await ProductsGroups.findById(req.params.Id);
        if (!productsGroups) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422);
        }
        return res.status(200).json(productsGroups);
    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function addProductsGroup(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {name} = req.body;
        const productsGroup: IDocProductsGroups = new ProductsGroups({name});
        productsGroup.createdBy = req.user._id;
        await productsGroup.save();
        alert(res,200,messageAlert.success,'New Product Group is registered');
    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function editProductsGroup(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function deleteProductsGroup(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
    } catch (err) {
        errorCatcher(next,err);
    }
}
