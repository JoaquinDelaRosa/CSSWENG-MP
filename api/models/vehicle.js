"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleSchema = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
exports.VehicleSchema = new mongoose_1.default.Schema({
    id: { type: String, default: (0, crypto_1.randomUUID)() },
    licensePlate: String,
    make: String,
    model: String,
    yearManufactured: Number,
});
const Vehicle = mongoose_1.default.model('Vehicle', exports.VehicleSchema);
module.exports = Vehicle;
//# sourceMappingURL=vehicle.js.map