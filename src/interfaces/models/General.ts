import {IDocUsers} from "./Users";

export interface ICreatedEditData {
    createdBy:IDocUsers["_id"];
    modifiedBy:Array<{
        _id:IDocUsers["_id"],
        modifiedDate:Date,
    }>;
}