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
/*
 * GET users listing.
 */
const express = require("express");
const user_1 = require("../../models/user");
const router = express.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.User.find({})
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((data) => {
        res.json(data);
    });
}));
router.get("/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.User.find({ id: req.query.id })
        .then((data) => {
        res.json(data);
    });
}));
router.post("/create", (req, res) => {
    console.log(req.body);
    user_1.User.create(req.body, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
});
router.post("/update", (req, res) => {
    user_1.User.updateOne({ id: req.query.id }, req.body, (error) => {
        if (error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    });
});
router.delete("/delete", (req, res) => {
    user_1.User.deleteOne({ id: req.query.id })
        .then((result) => {
        res.end();
    })
        .catch((error) => {
        console.log(error);
        res.end();
    });
});
router.get("/filter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = makeQuery(req);
    user_1.User.find({ username: query.username })
        .skip(parseInt(req.query.skip))
        .limit(parseInt(req.query.limit))
        .then((result) => {
        res.json(result);
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
}));
const makeQuery = (req) => {
    return {
        username: (req.query.username) ? req.query.username : ""
    };
};
exports.default = router;
