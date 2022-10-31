"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const path = require("path");
const index_1 = require("./routes/index");
const bodyParser = require('body-parser');
const customerRouter = require('./routes/item-controllers/customer');
const debug = require('debug')('my express app');
const app = express();
const CONNECTION_STRING = "mongodb+srv://Admin:oA5IQmJy33VXrIzj@autoworks.jagxl7s.mongodb.net/?retryWrites=true&w=majority";
const mongo = mongoose_1.default.connect(CONNECTION_STRING);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/api/customer', customerRouter);
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
