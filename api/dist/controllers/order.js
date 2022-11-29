"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const customer_1 = require("../models/customer");
const order_1 = require("../models/order");
const vehicle_1 = require("../models/vehicle");
const order_2 = require("../projections/order");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield order_1.Order.countDocuments({});
    order_1.Order.find({})
        .populate("customer")
        .populate("vehicle")
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort({ $natural: -1 })
        .then((data) => {
        res.json({ data: (0, order_2.makeOrderArrayView)(data), count: count ? count : 0 });
    });
});
const id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_1.Order.findOne({ _id: req.query.id })
        .populate("customer")
        .populate("vehicle")
        .then((data) => {
        res.json((0, order_2.makeOrderView)(data));
    });
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_1.Order.create(Object.assign(Object.assign({}, req.body), { _id: (0, crypto_1.randomUUID)() }), (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_1.Order.updateOne({ _id: req.query.id }, req.body, (error) => {
        if (error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    });
});
const remove = (req, res) => {
    order_1.Order.deleteOne({ _id: req.query.id })
        .then((delRes) => {
        res.end();
    })
        .catch((error) => {
        console.log(error);
        res.end();
    });
};
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.isVerified);
    order_1.Order.findByIdAndUpdate(req.query.id, { isVerified: req.body.isVerified }, (response, error) => {
        if (response) {
            res.json({
                success: true,
            });
        }
        else
            console.log(error);
    });
});
const filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = makeQuery(req);
    const mongooseQuery = makeMongooseQuery(query);
    const customerList = yield getCustomerList(mongooseQuery);
    const vehicleList = yield getVehicleList(mongooseQuery);
    const finalQuery = Object.assign(Object.assign({}, mongooseQuery), { customer: { $in: [...customerList] }, vehicle: { $in: [...vehicleList] } });
    const count = yield order_1.Order.find(finalQuery).countDocuments();
    order_1.Order.find(finalQuery)
        .populate("customer")
        .populate("vehicle")
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((data) => {
        res.json({ data: (0, order_2.makeOrderArrayView)(data), count: count ? count : 0 });
    });
});
const getCustomerList = (mongooseQuery) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_1.Customer.aggregate([
        {
            $project: {
                "id": "$_id",
                "firstName": "$firstName",
                "lastName": "$lastName",
                "name": {
                    $concat: ["$firstName", " ", "$lastName"]
                }
            }
        }
    ])
        .match({
        name: mongooseQuery.customer
    })
        .then((data) => {
        return data.map((value) => value.id);
    });
});
const getVehicleList = (mongooseQuery) => __awaiter(void 0, void 0, void 0, function* () {
    return yield vehicle_1.Vehicle.find({
        licensePlate: mongooseQuery.vehicle
    }).then((data) => {
        return data.map((value) => value._id);
    });
});
const makeMongooseQuery = (q) => {
    let query = {
        customer: { $regex: ".*" + q.customerName + ".*", $options: "i" },
        vehicle: { $regex: ".*" + q.licensePlate + ".*", $options: "i" },
    };
    if (q.status !== "") {
        query["status"] = { $eq: q.status };
    }
    if (q.type !== "") {
        query["type"] = { $eq: q.type };
    }
    return query;
};
const makeQuery = (req) => {
    return {
        status: (req.query.status) ? req.query.status : "",
        type: (req.query.type) ? req.query.type : "",
        customerName: (req.query.customerName) ? req.query.customerName : "",
        licensePlate: (req.query.licensePlate) ? req.query.licensePlate : "",
    };
};
exports.default = { all, id, create, update, remove, filter, verify };
