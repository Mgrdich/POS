import {NextFunction, Request, Response} from "express";
import {noResult} from "../utilities/controllers/helpers";
import {errorCatcher, errorThrower} from "../utilities/controllers/error";
import {IDocProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {NO_SUCH_DATA_EXISTS} from "../utilities/contants/messages";

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let products: Array<IDocProducts> | IDocProducts = await Products.find({});
        if (products.length) {
            return res.status(200).json(products);
        }
        noResult(res);
    } catch (err) {
        errorCatcher(next, err);
    }
}

export async function getProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let product:IDocProducts = await Products.findById(req.params.Id);
        if (!product) {
            errorThrower(NO_SUCH_DATA_EXISTS, 422);
        }
        return res.status(200).json(product);
    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function addProduct(req: Request, res: Response, next: NextFunction): Promise<any> {

}

export async function editProduct(req: Request, res: Response, next: NextFunction): Promise<any> {

}

export async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any> {

}
