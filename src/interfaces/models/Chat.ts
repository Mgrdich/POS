import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";
import {IDocMessage} from "./Message";

export interface IChat {
    messages:Array<IDocMessage["_id"]>;
    participants:Array<IDocUsers["_id"]>;
}

//Mongoose modal
export interface IDocChat extends Document, IChat {

}

export interface IModelChat extends Model<IDocChat> {
    //here we declare the statics
}