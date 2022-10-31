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
const express = require("express");
const order_1 = require("../../models/order");
const router = express.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_1.Order.find({})
        .then((data) => {
        res.json(data);
    });
}));
router.post("/create", (req, res) => {
    console.log(req.body);
    order_1.Order.create(req.body, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
});
router.get("/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_1.Order.find({ id: req.query.id })
        .then((data) => {
        res.json(data);
    });
}));
router.post("/update", (req, res) => {
    order_1.Order.updateOne({ id: req.query.id }, req.body, (error) => {
        if (error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    });
});
router.post("/delete", (req, res) => {
    order_1.Order.deleteOne({ id: req.query.id })
        .then((delRes) => {
        res.end();
    })
        .catch((error) => {
        console.log(error);
        res.end();
    });
});
exports.default = router;
