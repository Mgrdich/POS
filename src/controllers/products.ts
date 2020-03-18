import {NextFunction, Request, Response} from "express";
import {noResult} from "../utilities/controllers/helpers";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {IDocProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS, NOT_MODIFIED} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../interfaces/util";
import {validationResult} from "express-validator";

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

export async function addProduct(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }
        const {name, price,productsGroup} = req.body;
        const product: IDocProducts = new Products({name,price});
        product.createdBy = req.user._id;
        await product.addProduct(productsGroup);
        alert(res,200,messageAlert.success,'New Product is registered');
    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function editProduct(req: myRequest, res: Response, next: NextFunction): Promise<any> {
    try {
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

        const {name, price} = req.body;
        const currentProduct: IDocProducts = await Products.findById(req.params.id);
        currentProduct.name = name;
        currentProduct.price = price;
        currentProduct.modifiedBy.push({"_id": req.user._id,modifiedDate: new Date()});
        await currentProduct.save();
        alert(res,200,messageAlert.success,'Product element has been edited');
    } catch (err) {
        errorCatcher(next,err);
    }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

        const respnose = await Products.deleteProductById(req.params.id);
        if (respnose[0].ok  && respnose[1].ok) {
            alert(res,200,messageAlert.success,ITEM_DELETED);
        } else {
            alert(res,304,messageAlert.success,NOT_MODIFIED)
        }
    } catch (err) {
        errorCatcher(next,err);
    }
}
