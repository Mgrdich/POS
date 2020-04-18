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

export function isEmpty(value: any): boolean {
    return (
        !!(value === undefined || value === null ||
            (typeof value === 'object' && !(Array.isArray(value)) && value["empty"]) ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
    );
}
