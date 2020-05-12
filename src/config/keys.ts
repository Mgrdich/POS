const MONGODB_URI: string = `mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`;
const MONGOOSE_OPTIONS: any = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};
const SECRET_KEY: string = process.env.SECRET_KEY;

export {MONGODB_URI, MONGOOSE_OPTIONS, SECRET_KEY};