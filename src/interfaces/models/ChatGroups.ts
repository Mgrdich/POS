import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";
import {IDocMessage} from "./Message";

export interface IGroupsChat {
    messages: Array<IDocMessage["_id"]>;
    participants: Array<IDocUsers["_id"]>;
}

//Mongoose modal
export interface IDocGroupsChat extends Document, IGroupsChat {

}

export interface IModelGroupsChat extends Model<IDocGroupsChat> {
    //here we declare the statics
    add: (sender:IDocUsers["id"],string) => Promise<any>;
}