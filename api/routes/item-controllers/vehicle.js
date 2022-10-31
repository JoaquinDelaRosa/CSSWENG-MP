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
const vehicle_1 = require("../../models/vehicle");
const router = express.Router();
router.get("/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        vehicle_1.Vehicle.find({})
            .then((data) => {
            res.json(data);
        });
    });
});
router.get("/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        vehicle_1.Vehicle.find({ id: req.query.id })
            .then((data) => {
            res.json(data);
        });
    });
});
router.get("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        vehicle_1.Vehicle.create(req.body, (error, result) => {
            if (error) {
                console.log(error);
            }
            return result;
        });
        res.json(req.body);
        res.end();
    });
});
router.get("/update", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        vehicle_1.Vehicle.find({})
            .then((data) => {
            res.json(data);
        });
    });
});
exports.default = router;
