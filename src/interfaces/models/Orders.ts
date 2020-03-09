import {Document} from 'mongoose';


export interface IOrders {

}

//Mongoose modal
export interface IDocOrders extends Document, IOrders {
}