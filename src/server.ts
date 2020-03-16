import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import passportConfig from "./config/passport";
import {MONGODB_URI, MONGOOSE_OPTIONS} from "./config/keys";
import {NextFunction, Request, Response} from "express";
import users from "./routes/users";
import api from "./routes/api";
import tables from "./routes/tables";
import products from "./routes/products";
import productsGroups from "./routes/productsGroups";
import {ImyError} from "./interfaces/General";
import {isAuth} from "./middlewares/authorisation";

const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


//CORS
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AuthorizationComponent,Authorization');
    next();
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
passportConfig(passport);


// Routes
app.use('/users', users);

app.use(isAuth()); //all the routes should require an Authorization

app.use('/api',api);

app.use('/tables',tables);

app.use('/products',products);

app.use('/products-group',productsGroups);

//errors
app.use(function (err: ImyError, req: Request, res: Response, next: NextFunction) {
    const status: number = err.statusCode || 500;
    const message: string = err.message;
    const data = err.data;
    res.status(status).json({message, data});
});


const port: number | string = process.env.PORT || 8080;

mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS)
    .then(function () {
        app.listen(port);
    }).catch(function (err) {
    console.log(err);
});