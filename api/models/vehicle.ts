import { randomUUID } from "crypto";
import mongoose from "mongoose";

export const VehicleSchema = new mongoose.Schema({
    _id : {
        type: String, 
    },
    licensePlate : String,
    manufacturer : String,
    model : String,
    yearManufactured : Number,
    color: String,
    engine: String,
    remarks: String,
}, {_id: false});

export const Vehicle = mongoose.model('Vehicle', VehicleSchema);
