import {Schema} from "mongoose";
import * as mongoose from "mongoose";

const modifiedBySchema = new Schema({ //TODO create a static function and replace all the instances promise return the schema id
    modifiedBy: { //message id
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
});
