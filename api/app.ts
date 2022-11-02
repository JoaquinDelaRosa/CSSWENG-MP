import * as express from 'express';
import mongoose from 'mongoose';
import { AddressInfo } from "net";
import * as path from 'path';
import router from './routes';

// route imports
import authzRoutes from './routes/authz';
import customerRoutes from './routes/customer';
import orderRoutes from './routes/order';
import userRoutes from './routes/user';
import vehicleRoutes from './routes/vehicle';

const bodyParser = require('body-parser');

const debug = require('debug')('my express app');
const app = express();

// connections
const CONNECTION_STRING = "mongodb+srv://Admin:oA5IQmJy33VXrIzj@autoworks.jagxl7s.mongodb.net/autoworks?retryWrites=true&w=majority";
const mongo = mongoose.connect(CONNECTION_STRING);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// route calls
app.use('/api/authz', authzRoutes);
app.use('/api/user', userRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/customer', customerRoutes);



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