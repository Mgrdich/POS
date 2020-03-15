import {Document} from 'mongoose';


export interface IProducts {

}

//Mongoose modal
export interface IDocProducts extends Document, IProducts {
}