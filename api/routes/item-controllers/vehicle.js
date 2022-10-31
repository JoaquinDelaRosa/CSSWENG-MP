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
const api_1 = require("../api");
const router = express.Router();
router.get(api_1.API_PREFIX + "Vehicles/all", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vehicle_1.Vehicle.find({});
        res.json(result);
    });
});
router.get(api_1.API_PREFIX + "Vehicles/id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vehicle_1.Vehicle.find({ id: req.query.id });
        res.json(result);
    });
});
exports.default = router;
