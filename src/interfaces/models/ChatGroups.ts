import {Document, Model} from 'mongoose';
import {IDocUsers} from "./Users";
import {IDocMessage} from "./Message";
import {ICreatedEditData} from "./General";

export interface IGroupsChat extends ICreatedEditData{
    name: string;
    createdBy: IDocUsers["_id"];
    admins: Array<IDocUsers["_id"]>;
    members: Array<IDocUsers["_id"]>;
    messages?: Array<IDocMessage["_id"]>;
}

//Mongoose modal
export interface IDocGroupsChat extends Document, IGroupsChat {

}

export interface IModelGroupsChat extends Model<IDocGroupsChat> {
    //here we declare the statics
    add: (sender: IDocUsers["id"], string) => Promise<any>;
}