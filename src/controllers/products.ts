import {NextFunction, Request, Response} from "express";
import {noResult} from "../utilities/controllers/helpers";
import {errorCatcher, errorFormatter, errorThrower} from "../utilities/controllers/error";
import {IDocProducts} from "../interfaces/models/Products";
import {Products} from "../models/Products";
import {ITEM_DELETED, NO_SUCH_DATA_EXISTS, NOT_MODIFIED} from "../utilities/constants/messages";
import {myRequest} from "../interfaces/General";
import {alert} from "../utilities/controllers/messages";
import {messageAlert} from "../utilities/constants/enums";
import {validationResult} from "express-validator";
import {tableDataNormalize} from "../utilities/reformaters";
import {GET_PRODUCTS_TABLE} from "../utilities/tables/constants";

export async function getProducts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        let products: Array<IDocProducts> =
            await Products.find({},{name:1,group:1,createdDate:1,price:1}).lean().populate({path:'group',select:'name'});
        if (products.length) {
            const tableProducts = tableDataNormalize(products,GET_PRODUCTS_TABLE);
            return res.status(200).json(tableProducts);
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
        const errors: any = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            errorThrower("Validation Failed", 422, errors.mapped());
        }

        const product = await Products.findOne({_id:req.params.id});
        const resp = await product.deleteProductById();
        if (resp[0].ok  && resp[1].ok) {
            alert(res,200,messageAlert.success,ITEM_DELETED);
        } else {
            alert(res,304,messageAlert.success,NOT_MODIFIED)
        }
    } catch (err) {
        errorCatcher(next,err);
    }
}
