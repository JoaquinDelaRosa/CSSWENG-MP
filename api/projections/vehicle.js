"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeVehicleArrayView = exports.makeVehicleView = void 0;
const makeVehicleView = (document) => {
    return {
        id: document.id,
        licensePlate: document.licensePlate,
        manufacturer: document.manufacturer,
        model: document.model,
        yearManufactured: document.yearManufactured
    };
};
exports.makeVehicleView = makeVehicleView;
const makeVehicleArrayView = (documents) => {
    return documents.map((val) => {
        return (0, exports.makeVehicleView)(val);
    });
};
exports.makeVehicleArrayView = makeVehicleArrayView;
