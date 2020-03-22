import * as mongoose from "mongoose";

export function isMongooseValidId(id:any):boolean {
    return mongoose.Types.ObjectId.isValid(id)
}

export function sameObjectId(objId1, objId2):boolean {
    if(!isMongooseValidId(objId1) ||!isMongooseValidId(objId2)) {
        return false;
    }
    return objId1.toString() === objId2.toString();
}
