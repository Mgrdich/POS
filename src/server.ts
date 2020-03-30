import * as express from "express";
import * as mongoose from "mongoose";
import socket from "./socket"
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
import orders from "./routes/orders";
import chat from "./routes/chat";
import groupChat from "./routes/chatGroups";
import {ImyError} from "./interfaces/General";
import {isAuth} from "./middlewares/authorisation";
import {socketEvents} from "./socketEvents";

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


//TODO bring all the the routes into a single middleware

// Routes
app.use('/users', users);

app.use(isAuth()); //all the routes should require an Authorization

app.use('/api', api);

app.use('/tables', tables);

app.use('/products', products);

app.use('/products-group', productsGroups);

//TODO after this only admin super admin role
app.use('/orders', orders);

app.use('/chat',chat);

app.use('/group-chat',groupChat);

//errors
app.use(function (err: ImyError, req: Request, res: Response, next: NextFunction) {
    const status: number = err.statusCode || 500;
    const message: string = err.message;
    const data = err.data;
    res.status(status).json({message, data});
});


const port: number | string = process.env.PORT || 8080;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

mongoose.connect(MONGODB_URI, MONGOOSE_OPTIONS)
    .then(function () {
        const server = app.listen(port);
        const io = socket.init(server);
        socketEvents(io);
    }).catch(function (err) {
    console.log(err);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});