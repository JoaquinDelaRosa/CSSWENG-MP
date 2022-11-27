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
const vehicle_1 = require("../models/vehicle");
const vehicle_2 = require("../projections/vehicle");
const crypto_1 = require("crypto");
const count = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    vehicle_1.Vehicle.countDocuments({})
        .then((count) => {
        res.json({ vehicleCount: count });
    });
});
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield vehicle_1.Vehicle.countDocuments({});
    vehicle_1.Vehicle.find({})
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((data) => {
        res.json({ data: vehicle_2.makeVehicleArrayView(data), count: count ? count : 0 });
    });
});
const id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    vehicle_1.Vehicle.findOne({ _id: req.query.id })
        .then((data) => {
        res.json(vehicle_2.makeVehicleView(data));
    });
});
const create = (req, res) => {
    vehicle_1.Vehicle.create(Object.assign({ _id: crypto_1.randomUUID() }, req.body))
        .then((result) => {
        console.log(result);
    })
        .catch((err) => {
        console.log(err);
    })
        .finally(() => {
        res.json(req.body);
        res.end();
    });
};
const update = (req, res) => {
    vehicle_1.Vehicle.updateOne({ _id: req.query.id }, req.body, (err) => {
        if (err) {
            console.log(err);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
        res.end();
    });
};
const remove = (req, res) => {
    vehicle_1.Vehicle.deleteOne({ _id: req.query.id })
        .then((delRes) => {
        res.end();
    })
        .catch((err) => {
        console.log(err);
        res.end();
    });
};
const filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = makeQuery(req);
    const count = yield vehicle_1.Vehicle.find(makeMongooseQuery(query)).countDocuments();
    vehicle_1.Vehicle.find(makeMongooseQuery(query))
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((result) => {
        res.json({ data: vehicle_2.makeVehicleArrayView(result), count: count ? count : 0 });
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
});
const makeMongooseQuery = (q) => {
    let query = {
        licensePlate: { $regex: ".*" + q.licensePlate + ".*", $options: "i" },
        model: { $regex: ".*" + q.model + ".*", $options: "i" },
        manufacturer: { $regex: ".*" + q.manufacturer + ".*", $options: "i" }
    };
    if (q.yearManufactured > 0) {
        query["yearManufactured"] = q.yearManufactured;
    }
    return query;
};
const makeQuery = (req) => {
    return {
        licensePlate: (req.query.licensePlate) ? req.query.licensePlate : "",
        model: (req.query.model) ? req.query.model : "",
        manufacturer: (req.query.manufacturer) ? req.query.manufacturer : "",
        yearManufactured: (req.query.yearManufactured) ? parseInt(req.query.yearManufactured) : -1,
        color: (req.query.color) ? req.query.color : "",
        engine: (req.query.engine) ? req.query.engine : "",
        remarks: (req.query.remarks) ? req.query.remarks : "",
    };
};
exports.default = { all, id, create, update, remove, filter, count };
