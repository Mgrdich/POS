import {IDocUsers} from "./Users";

export interface ICreatedEditData {
    createdDate:Date;
    createdBy:IDocUsers["_id"];
    modifiedBy:Array<{
        _id:IDocUsers["_id"],
        modifiedDate:Date,
    }>;
}