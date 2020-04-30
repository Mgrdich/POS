import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {IDocTables, IModelTables} from "../interfaces/models/Tables";
import {TABLE_STATUS} from "../utilities/constants/arrays";
import {TableStatus} from "../utilities/constants/enums";

const tableSchema: Schema = new Schema({
    name: {
        type: String,
    },
    number: {
        type:Number,
        required: true,
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: 'Orders'
    },
    status: {
        type:String,
        enum:TABLE_STATUS,
        default:TableStatus.closed
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    modifiedBy:[
        { //TODO Modified by Schema
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users',
            },
            modifiedDate: {
                type:Date,
            }
        }
    ],
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
},{timestamps:true});

tableSchema.statics.changeTableStatus = async function (_id: IDocTables["_id"], status: TableStatus,ignoreStatus?:TableStatus) {
    const table: IDocTables = await this.findById(_id);
    if (table) {
        if(ignoreStatus && table.status === ignoreStatus) { //reserve will keep being reserved
            return  Promise.resolve({status:TableStatus.open});
        }
        table.status = status;
        return table.save();
    }
    return Promise.reject('table id is not Found');
};


const Tables:IModelTables = mongoose.model<IDocTables,IModelTables>('Tables',tableSchema);


export {Tables};