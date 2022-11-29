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
const user_1 = require("../models/user");
const user_2 = require("../projections/user");
const crypto_1 = require("crypto");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield user_1.User.countDocuments({});
    user_1.User.find({})
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .sort({ $natural: -1 })
        .then((data) => {
        res.json({ data: (0, user_2.makeUserArrayView)(data), count: count ? count : 0 });
    });
});
const id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.User.findOne({ _id: req.query.id })
        .then((data) => {
        res.json((0, user_2.makeUserView)(data));
    });
});
const create = (req, res) => {
    const id = (0, crypto_1.randomUUID)();
    user_1.User.create(Object.assign({ _id: id }, req.body))
        .then((result) => {
        console.log(result);
    })
        .catch((err) => {
        console.log(err);
    })
        .finally(() => {
        res.json(Object.assign({ id: id }, req.body));
        res.end();
    });
};
const update = (req, res) => {
    user_1.User.updateOne({ _id: req.query.id }, req.body, (error) => {
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
    user_1.User.deleteOne({ _id: req.query.id })
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
    const count = yield user_1.User.find(makeMongooseQuery(query)).countDocuments();
    user_1.User.find(makeMongooseQuery(query))
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((result) => {
        res.json({ data: (0, user_2.makeUserArrayView)(result), count: count ? count : 0 });
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
});
const makeMongooseQuery = (q) => {
    let query = {
        username: { $regex: ".*" + q.username + ".*", $options: "i" }
    };
    return query;
};
const makeQuery = (req) => {
    return {
        username: (req.query.username) ? req.query.username : ""
    };
};
exports.default = { all, id, create, update, remove, filter };
