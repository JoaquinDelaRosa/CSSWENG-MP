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
const customer_2 = require("../projections/customer");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield customer_1.Customer.countDocuments({});
    customer_1.Customer.find({})
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((data) => {
        res.json({ data: (0, customer_2.makeCustomerArrayView)(data), count: count ? count : 0 });
    });
});
const id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    customer_1.Customer.findOne({ _id: req.query.id })
        .then((data) => {
        res.json((0, customer_2.makeCustomerView)(data));
    });
});
const create = (req, res) => {
    const id = (0, crypto_1.randomUUID)();
    customer_1.Customer.create(Object.assign({ _id: id }, req.body))
        .then((result) => {
        console.log(result);
        res.json(Object.assign(Object.assign({}, req.body), { id: id }));
    })
        .catch((err) => {
        console.log(err);
    })
        .finally(() => {
        res.end();
    });
};
const update = (req, res) => {
    customer_1.Customer.updateOne({ _id: req.query.id }, req.body, (error) => {
        if (error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    });
};
const remove = (req, res) => {
    customer_1.Customer.deleteOne({ _id: req.query.id })
        .then((result) => {
        res.end();
    })
        .catch((error) => {
        console.log(error);
        res.end();
    });
};
const filter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = makeQuery(req);
    const count = yield getCount(query);
    customer_1.Customer.aggregate([
        {
            $project: {
                "id": "$_id",
                "firstName": "$firstName",
                "lastName": "$lastName",
                "mobileNumber": "$mobileNumber",
                "email": "$email",
                "name": {
                    $concat: ["$firstName", " ", "$lastName"]
                },
                "company": "$company",
                "insurance": "$insurance",
                "remarks": "$remarks"
            }
        }
    ])
        .match(makeMongooseQuery(query))
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((result) => {
        res.json({ data: (0, customer_2.makeCustomerArrayView)(result),
            count: (count && count[0] && count[0]["count"] ? count[0]["count"] : 0) });
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
});
const getCount = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield customer_1.Customer.aggregate([
        {
            $project: {
                "id": "$_id",
                "firstName": "$firstName",
                "lastName": "$lastName",
                "mobileNumber": "$mobileNumber",
                "email": "$email",
                "name": {
                    $concat: ["$firstName", " ", "$lastName"]
                },
                "company": "$company",
                "insurance": "$insurance",
                "remarks": "$remarks"
            }
        }
    ])
        .match(makeMongooseQuery(query))
        .count("count");
});
const makeMongooseQuery = (q) => {
    let query = {
        name: { $regex: ".*" + q.name + ".*", $options: "i" },
        email: { $regex: ".*" + q.email + ".*", $options: "i" },
        mobileNumber: { $regex: ".*" + q.mobileNumber + ".*", $options: "i" },
        company: { $regex: ".*" + q.company + ".*", $options: "i" },
        insurance: { $regex: ".*" + q.insurance + ".*", $options: "i" },
        remarks: { $regex: ".*" + q.remarks + ".*", $options: "i" }
    };
    return query;
};
const makeQuery = (req) => {
    return {
        name: (req.query.name) ? req.query.name : "",
        email: (req.query.email) ? req.query.email : "",
        mobileNumber: (req.query.mobileNumber) ? req.query.mobileNumber : "",
        company: (req.query.company) ? req.query.company : "",
        insurance: (req.query.insurance) ? req.query.insurance : "",
        remarks: (req.query.remarks) ? req.query.remarks : ""
    };
};
exports.default = { all, id, create, update, remove, filter };
