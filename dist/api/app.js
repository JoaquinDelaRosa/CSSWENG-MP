"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const path = require("path");
const cookieparser = require("cookie-parser");
const bodyParser = require('body-parser');
const debug = require('debug')('my express app');
const app = express();
const cors = require('cors');
// connections
const CONNECTION_STRING = "mongodb+srv://Admin:oA5IQmJy33VXrIzj@autoworks.jagxl7s.mongodb.net/autoworks?retryWrites=true&w=majority";
const mongo = mongoose_1.default.connect(CONNECTION_STRING);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Enable cors
var corsOptions = {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', "access-control-allow-credentials"],
    methods: ['GET', 'POST', 'DELETE']
};
app.use(cors(corsOptions));
// route imports
const authz_1 = require("./routes/authz");
const customer_1 = require("./routes/customer");
const order_1 = require("./routes/order");
const user_1 = require("./routes/user");
const vehicle_1 = require("./routes/vehicle");
const enums_1 = require("./routes/enums");
const index_1 = require("./routes/index");
// route calls
app.use('/api/authz', authz_1.default);
app.use('/api/user', user_1.default);
app.use('/api/vehicle', vehicle_1.default);
app.use('/api/order', order_1.default);
app.use('/api/customer', customer_1.default);
app.use('/api', enums_1.default);
app.use('/', index_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    console.log(`Express server listening on port ${server.address().port}`);
});
