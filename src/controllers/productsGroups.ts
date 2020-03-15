import {NextFunction, Request, Response} from "express";
import {noResult} from "../utilities/controllers/helpers";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {NO_SUCH_DATA_EXISTS} from "../utilities/contants/messages";
import {myRequest} from "../interfaces/General";
import {validationResult} from "express-validator";
import {IDocProductsGroups} from "../interfaces/models/ProductsGroups";
import {ProductsGroups} from "../models/ProductsGroups";

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

    } catch (err) {
        errorCatcher(next,err);
    }
}
