"use strict";
/*
 * GET users listing.
 */
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
const customer_1 = require("../../models/customer");
const router = express.Router();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    customer_1.Customer.find({})
        .then((data) => {
        res.json(data);
    });
}));
router.get("/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    customer_1.Customer.find({ id: req.query.id })
        .then((data) => {
        res.json(data);
    });
}));
router.post("/create", (req, res) => {
    console.log(req.body);
    customer_1.Customer.create(req.body, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
});
router.post("/update", (req, res) => {
    customer_1.Customer.updateOne({ id: req.query.id }, req.body, (error) => {
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
    customer_1.Customer.deleteOne({ id: req.query.id })
        .then((result) => {
        res.end();
    })
        .catch((error) => {
        console.log(error);
        res.end();
    });
});
module.exports = router;
//# sourceMappingURL=customer.js.map