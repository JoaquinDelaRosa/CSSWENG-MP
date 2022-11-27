"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.VehicleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.VehicleSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
    },
    licensePlate: String,
    manufacturer: String,
    model: String,
    yearManufactured: Number,
    color: String,
    engine: String,
    remarks: String,
}, { _id: false });
exports.Vehicle = mongoose_1.default.model('Vehicle', exports.VehicleSchema);
