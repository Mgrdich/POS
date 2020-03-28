import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";

export interface IMessage {
    message: string; //for now
    sender: IDocUsers["_id"];
}

//Mongoose modal
export interface IDocMessage extends Document, IMessage {

}

export interface IModelMessage extends Model<IDocMessage> {
    //here we declare the statics
    addMessage: (message:string,userId:IDocUsers["_id"]) => Promise<any>;
}