import express from 'express';
import mongoose from 'mongoose';
import { AddressInfo } from "net";
import path from 'path';
import cookieparser = require('cookie-parser');

const bodyParser = require('body-parser');
const serverless = require('serverless-http')

const debug = require('debug')('my express app');
const app = express();

import cors = require('cors');


// connections
const CONNECTION_STRING = "mongodb+srv://Admin:oA5IQmJy33VXrIzj@autoworks.jagxl7s.mongodb.net/autoworks?retryWrites=true&w=majority";
const mongo = mongoose.connect(CONNECTION_STRING);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

// Enable cors

var corsOptions = {
    origin: ["https://toptech-autoworks-logger.netlify.app", "https://autoworks-logger-api.netlify.app"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With',  'Accept', 'Content-Type', 'Authorization', "access-control-allow-credentials"],
    methods: ['GET', 'POST', 'DELETE']
  }
app.use(cors(corsOptions));

// route imports
import authzRoutes from './routes/authz';
import customerRoutes from './routes/customer';
import orderRoutes from './routes/order';
import userRoutes from './routes/user';
import vehicleRoutes from './routes/vehicle';
import enumRoutes from './routes/enums';

import indexRoute from './routes/index';
// route calls
const BASE = '/.netlify/functions/api'

app.use(BASE + '/api/authz', authzRoutes);
app.use(BASE + '/api/user', userRoutes);
app.use(BASE + '/api/vehicle', vehicleRoutes);
app.use(BASE + '/api/order', orderRoutes);
app.use(BASE + '/api/customer', customerRoutes);
app.use(BASE + '/api', enumRoutes);
app.use(BASE + '/', indexRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err[ 'status' ] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});

module.exports.handler = serverless(app)